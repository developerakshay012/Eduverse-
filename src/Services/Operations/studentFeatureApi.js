import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Images/rzplog.png"; // 👈 Aapka naya Eduverse logo asset
import { setPaymentLoading } from "../../Slices/courseSlice";
import { resetCart } from "../../Slices/cartSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    // remove old razorpay script
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch,
) {
  console.log("Token going to backend:", token);
  const toastId = toast.loading("Loading...");

  try {
    // 1. Load the Razorpay SDK script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!res) {
      toast.error("RazorPay SDK failed to load");
      toast.dismiss(toastId);
      return;
    }

    // 2. Initiate the order on backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` },
    );

    console.log("=== API RESPONSE RECEIVED IN FRONTEND ===", orderResponse);

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse?.data?.message || "Order creation failed");
    }

    // Safe extracting of variables
    const orderIdValue = orderResponse?.data?.orderId;
    const amountValue = orderResponse?.data?.amount;
    const currencyValue = orderResponse?.data?.currency;

    console.log("=== EXTRACTED ORDER ID ===", orderIdValue);

    // 3. Configuration options for Razorpay Checkout UI
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: amountValue,
      currency: currencyValue,
      order_id: orderIdValue, 
      name: "Eduverse",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo, // 👈 LOGO IDHAR ADD KAR DIYA HAI (Razorpay UI pop-up ke liye)
      prefill: {
        name: `${userDetails?.firstName || ""} ${userDetails?.lastName || ""}`.trim(),
        email: userDetails?.email || "",
      },
      // Checkout pop-up ka top bar color Eduverse yellow ke sath match karne ke liye customize kar sakte hain
      theme: {
        color: "#FFD60A", 
      },
      handler: function (response) {
        // Trigger success notifications and verification steps
        sendPaymentSuccessEmail(response, amountValue, token);
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    console.log(import.meta.env.VITE_RAZORPAY_KEY, "this is from frontend");

    const paymentObject = new window.Razorpay(options);

    if (window.Razorpay) {
      document.body.classList.remove("razorpay-open");
    }

    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.error("RAZORPAY PAYMENT FAILED:", response.error);
      toast.error(response.error.description || "Payment failed");
    });
  } catch (error) {
    console.error("PAYMENT API ERROR:", error);
    toast.error(error.message || "Could not make Payment");
  } finally {
    toast.dismiss(toastId);
  }
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("payment Successful, ypou are addded to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}
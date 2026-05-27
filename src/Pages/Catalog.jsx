import React, { useEffect, useState } from "react";
import Footer from "../Components/Common/Footer";
import { useParams } from "react-router-dom";
import CourseSlider from "../Components/Core/Catalog/CourseSlider";
import { apiConnector } from "../Services/apiConnector";
import { categories } from "../Services/apis";
import { getCatalogaPageData } from "../Services/Operations/pageAndComponentData";
import { useSelector } from "react-redux";
import Course_Card from "../Components/Core/Catalog/Course_Cart";

const { CATEGORIES_API } = categories;

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();

  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", CATEGORIES_API);

        const category = res?.data?.data?.find(
          (ct) =>
            ct.name.replace(/\s+/g, "-").toLowerCase() ===
            catalogName.toLowerCase(),
        );

        console.log(category);

        setCategoryId(category?._id);
      } catch (error) {
        console.log("ERROR FETCHING CATEGORIES", error);
      }
    };

    getCategories();
  }, [catalogName]);

  // Fetch catalog page data
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId);

        console.log("Printing catalog data => ", res);

        setCatalogPageData(res);
      } catch (error) {
        console.log("ERROR FETCHING CATEGORY DETAILS", error);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  // console.log("Different Courses check:", catalogPageData?.differentCourses);

  // if (!catalogPageData) {
  //   return <div className="spinner"></div>;
  // }

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-[#161D29] px-4 ">
        <div className="mx-auto flex min-h-65 max-w-162.5 flex-col justify-center gap-4 lg:max-w-315 ">
          <p className="text-sm text-[#838894] up">
            {`Home / Catalog / `}
            <span className="text-[#FFE83D] ">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-[#F1F2FF] uppercase">
            {catalogPageData?.selectedCategory?.name}
          </p>
          <p className="max-w-217.5 text-[#999DAA]">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-162.5 px-4 py-12 lg:max-w-315">
        <div className="section_heading text-2xl uppercase font-semibold text-yellow-400">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-[#424854] text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-[#FFE83D] text-[#FFE83D]"
                : "text-[#C5C7D4]"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-[#FFE83D] text-[#FFE83D]"
                : "text-[#C5C7D4]"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider Courses={catalogPageData?.selectedCategory?.courses} />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-162.5 px-4 py-12 lg:max-w-315">
        <div className="section_heading">
          {/* "differentCourses" array hai, uska naam nahi nikal sakte heading mein. 
        Aap yahan static text likh sakte ho ya backend se category name bhej sakte ho. */}
         <p className="text-2xl font-semibold uppercase text-yellow-400">Top courses in Other Categories</p>
        </div>
        <div className="py-8">
          <CourseSlider
          
            // Fix: catalogPageData?.differentCourses?.course ki jagah sirf niche wala likho
            Courses={catalogPageData?.mostSellingCourses}
          />
          
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-162.5 px-4 py-12 lg:max-w-300">
        <div className="section_heading text-2xl uppercase text-amber-300 font-semibold">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[360px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;

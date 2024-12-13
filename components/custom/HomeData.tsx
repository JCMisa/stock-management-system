import React from "react";

const HomeData = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#E8E9E9] sm:text-4xl">
              Empowering Businesses Globally
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#76828D]">
              Our platform is trusted by organizations worldwide to boost
              productivity, streamline operations, and enhance customer
              experiences.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col  p-8">
              <dt className="text-sm font-semibold leading-6 text-[#76828D]">
                Active Users
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-[#E8E9E9]">
                12,345
              </dd>
            </div>
            <div className="flex flex-col p-8">
              <dt className="text-sm font-semibold leading-6 text-[#76828D]">
                Transactions Today
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-[#E8E9E9]">
                1.23M
              </dd>
            </div>
            <div className="flex flex-col p-8">
              <dt className="text-sm font-semibold leading-6 text-[#76828D]">
                Total Revenue
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-[#E8E9E9]">
                $5.6B
              </dd>
            </div>
            <div className="flex flex-col  p-8">
              <dt className="text-sm font-semibold leading-6 text-[#76828D]">
                Happy Customers
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-[#E8E9E9]">
                98%
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default HomeData;
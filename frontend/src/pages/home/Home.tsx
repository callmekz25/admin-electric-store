const Home = () => {
  return (
    <div className="px-8 py-10">
      <div className="flex items-center justify-center gap-10">
        <div className="bg-white  rounded-md p-4 gap-4 flex-col flex ">
          <span className="text-md font-medium">Tổng số hoá đơn</span>
          <span className=" font-semibold text-xl">10</span>
        </div>
        <div className="bg-white  rounded-md p-4 gap-4 flex-col flex ">
          <span className="text-md font-medium">Hoá đơn đã xác nhận</span>
          <span className=" font-semibold text-xl">10</span>
        </div>
        <div className="bg-white  rounded-md p-4 gap-4 flex-col flex ">
          <span className="text-md font-medium">Hoá đơn đang giao</span>
          <span className=" font-semibold text-xl">10</span>
        </div>
        <div className="bg-white  rounded-md p-4 gap-4 flex-col flex ">
          <span className="text-md font-medium">Hoá đơn đã huỷ</span>
          <span className=" font-semibold text-xl">10</span>
        </div>
      </div>
      <div className="flex items-center "></div>
    </div>
  );
};

export default Home;

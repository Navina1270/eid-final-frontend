"use client";
import CheckboxInput from "@/components/Common/Form/CheckboxInput";
import DateTimeInput from "@/components/Common/Form/DateTimeInput";
import TextInput from "@/components/Common/Form/TextInput";
import ModalComponent from "@/components/Common/ModalComponent/ModalComponent";
import RippleLoader from "@/components/Common/RippleLoader/RippleLoader";
import { useState } from "react";
const NotificationView = ({ handleClick }) => {
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const modalData = (
    <div className="p-6">
      <div className="flex flex-1  p-2">
        {/* Right Side - Robot GIF */}
        <div className="flex w-1/3 ">
          <img
            src="/images/working.gif"
            alt="RCA Processing Robot"
            className=" rounded-lg shadow-xl"
          />
        </div>
        {/* Left Side - Loader and Text */}
        <div className=" flex flex-col items-center justify-center p-4 space-y-2 ">
          {/* Header */}
          <div className="flex items-center  mb-4">
            <span className="text-green-400 text-2xl mr-2">✅</span>
            <h2 className="text-xl font-semibold">
              Notification Created Successfully...!
            </h2>
          </div>
          <p className="text-center text-sm text-gray-300 mb-6">
            You have created Notification successfully.
          </p>
        </div>
      </div>
      {/* Notification Prompt */}
      <div className="flex flex-col items-center mt-4 space-y-3">
        <p className="text-xl text-gray-300">
          Do you want to create a Work order for this Notification?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => handleClick("Yes")}
            className="px-4 py-2  text-white rounded  transition"
          >
            <img
              src="/logo/check.png"
              alt="check Icon"
              className="inline-block mr-2 w-8 h-8"
            />
          </button>
          <button
            onClick={() => handleClick("No_success")}
            className="px-4 py-2 text-white rounded  transition"
          >
            <img
              src="/logo/cancel.png"
              alt="cross Icon"
              className="inline-block mr-2 w-8 h-8"
            />
          </button>
        </div>
      </div>
    </div>
  );

  const handleEdit = (answer) => {
    if (answer === "View") {
      setEdit(false);

      console.log("View Notification clicked");
    } else if (answer === "Edit") {
      console.log("Edit Notification clicked");
      setEdit(true);
    }
    console.log("Edit Notification clicked", edit);
  };
  const data = {
    reportedBy: "John Smith",
    notification: "Equipment Failure",
    type: "Breakdown",
    description:
      "For the Centrifuge machine, it was observed to vibrate more than normal, which may lead to mechanical seal failure in next coming weeks.",
    notes: "Additional notes of attachment",
    breakdown: "Yes",
    startDate: "2024-03-10",
    endDate: "2024-03-15",
    location: "Plant A",
    section: "Chemical Processing Unit",
    mainPlant: "Chemical Processing Unit",
    workCenter: "Machinery Maintenance",
    plannerGroup: "Maintenance Team",
    materials: [
      {
        number: "MAT-100293",
        desc: "Sodium Hydroxide (NaOH) Pellets",
        qty: "250 kg",
      },
      {
        number: "MAT-100871",
        desc: 'Stainless Steel Pipe 3" - Grade 316',
        qty: "120 meters",
      },
    ],
  };

  const infoIcon = (
    <span className="ml-1 text-cyan-400 cursor-pointer" title="More Info">
      ℹ️
    </span>
  );

  const handleNotificationSubmit = (answer) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (answer === "Yes") {
        setShowModal(true);
      } else {
        console.log("Notification creation cancelled");
        handleClick("No");
      }
    }, 3000);

  }

  return (
    <>
      {/* Right Side - Image + Question */}
      {loading && (
        <RippleLoader />
      )}
      {showModal && (
        <ModalComponent
          heading={"Notification Created Successfully...!"}
          modalData={modalData}
          onClose={closeModal}
        />
      )}
      <div className="w-1/1  flex flex-col items-center py-5 px-20 border-b border-cyan-500 pb-4">
        {/* <h3 className="text-2xl text-cyan-400 mb-4 ">Notification Details</h3> */}
        {edit ? (
          <div className="rounded-xl shadow-xl p-6 max-w-5xl mx-auto mt-8 border border-cyan-400">
            <h2 className="text-2xl font-bold text-center mb-6 border-b border-cyan-500 pb-2">
              Edit Notification Details
            </h2>

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="space-y-2">
                {/* <p>
                  <span className="font-semibold">Reported By:</span>{" "}
                  {data.reportedBy}
                </p> */}
                <TextInput
                  placeholder="Reported By"
                  value={data.reportedBy}
                  onChange={(e) => setData({ ...data, reportedBy: e.target.value })}

                />
                <p>
                  <span className="font-semibold">Notification:</span>{" "}
                  {data.notification}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  <span className="text-gray-300">{data.description}</span>
                </p>
                <p>
                  <span className="font-semibold">Priority:</span> High
                </p>
                <p>
                  <span className="font-semibold">Required Start Date:</span>{" "}
                  {data.startDate}
                </p>
                <p>
                  <span className="font-semibold">Functional Location:</span>{" "}
                  {data.location}
                  {infoIcon}
                </p>
                <p>
                  <span className="font-semibold">Main Plant:</span>{" "}
                  {data.mainPlant}
                  {infoIcon}
                </p>
                <p>
                  <span className="font-semibold">Planner Group:</span>{" "}
                  {data.plannerGroup}
                  {infoIcon}
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Reported By:</span>{" "}
                  {data.reportedBy}
                </p>
                <p>
                  <span className="font-semibold">Notification Type:</span>{" "}
                  {data.type}
                </p>
                <p>
                  <span className="font-semibold">Additional Notes:</span>{" "}
                  {data.notes}{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Show Attachment
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Breakdown:</span>{" "}
                  {data.breakdown}
                </p>
                <p>
                  <span className="font-semibold">Required End Date:</span>{" "}
                  {data.endDate}
                </p>
                <p>
                  <span className="font-semibold">Plant Section:</span>{" "}
                  {data.section}
                  {infoIcon}
                </p>
                <p>
                  <span className="font-semibold">Main Work Ctr:</span>{" "}
                  {data.workCenter}
                  {infoIcon}
                </p>
              </div>
            </div>

            <div className=" border-b border-cyan-500 pb-4 Materials mb-4"></div>
            {/* Action Button */}
            <div className="flex justify-center gap-4">
              {/* <button
                className="bg-transparent border border-green-400 text-green-400 px-2 py-2 rounded hover:bg-green-500 hover:text-white transition"
                onClick={() => handleEdit("View")}
              >
                View Notification
              </button> */}
              <button
                className="bg-transparent border border-green-400 text-green-400 px-2 py-2 rounded hover:bg-green-500 hover:text-white transition"
                onClick={() => handleNotificationSubmit("Yes")}
              >
                Create Notification
              </button>
              <button
                className="bg-transparent border border-red-400 text-red-400 px-2 py-2 rounded */}
          {/* hover:bg-red-500 hover:text-white transition"
                onClick={() => handleClick("No")}
              >
                Cancel
              </button>
              {/*  */}
            </div>
          </div>

        ) : (
          <div className="rounded-xl shadow-xl p-6 max-w-5xl mx-auto mt-8 border border-cyan-400">
            <h2 className="text-2xl font-bold text-center mb-6 border-b border-cyan-500 pb-2">
              Notification Details
            </h2>

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Reported By:</span>{" "}
                  {data.reportedBy}
                </p>
                <p>
                  <span className="font-semibold">Notification:</span>{" "}
                  {data.notification}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  <span className="text-gray-300">{data.description}</span>
                </p>
                <p>
                  <span className="font-semibold">Priority:</span> High
                </p>
                <p>
                  <span className="font-semibold">Required Start Date:</span>{" "}
                  {data.startDate}
                </p>
                <p>
                  <span className="font-semibold">Functional Location:</span>{" "}
                  {data.location}
                  {infoIcon}
                </p>
                <p>
                  <span className="font-semibold">Main Plant:</span>{" "}
                  {data.mainPlant}
                  {infoIcon}
                </p>
                <p>
                  <span className="font-semibold">Planner Group:</span>{" "}
                  {data.plannerGroup}
                  {infoIcon}
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Reported By:</span>{" "}
                  {data.reportedBy}
                </p>
                <p>
                  <span className="font-semibold">Notification Type:</span>{" "}
                  {data.type}
                </p>
                <p>
                  <span className="font-semibold">Additional Notes:</span>{" "}
                  {data.notes}{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Show Attachment
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Breakdown:</span>{" "}
                  {data.breakdown}
                </p>
                <p>
                  <span className="font-semibold">Required End Date:</span>{" "}
                  {data.endDate}
                </p>
                <p>
                  <span className="font-semibold">Plant Section:</span>{" "}
                  {data.section}
                  {infoIcon}
                </p>
                <p>
                  <span className="font-semibold">Main Work Ctr:</span>{" "}
                  {data.workCenter}
                  {infoIcon}
                </p>
              </div>
            </div>

            <div className=" border-b border-cyan-500 pb-4 Materials mb-4"></div>
            {/* Action Button */}
            <div className="flex justify-center gap-4">
              <button
                className="bg-transparent border border-green-400 text-green-400 px-2 py-2 rounded hover:bg-green-500 hover:text-white transition"
                onClick={() => handleEdit("Edit")}
              >
                Edit Notification
              </button>
              <button
                className="bg-transparent border border-green-400 text-green-400 px-2 py-2 rounded hover:bg-green-500 hover:text-white transition"
                onClick={() => handleNotificationSubmit("Yes")}
              >
                Create Notification
              </button>
              <button
                className="bg-transparent border border-red-400 text-red-400 px-2 py-2 rounded */}
            {/* hover:bg-red-500 hover:text-white transition"
                onClick={() => handleClick("No")}
              >
                Cancel
              </button>
              {/*  */}
            </div>
          </div>
        )}
      </div>
      <div className="w-1/2  flex items-center justify-center ">
        <img
          src="/images/thumbsup.gif"
          alt="Setup GIF"
          className="max-h-[80%]"
        />
      </div>
    </>
  );
};

export default NotificationView;



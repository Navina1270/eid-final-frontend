import NextButton from '@/components/Common/Form/NextButton'
import SelectInput from '@/components/Common/Form/SelectInput'
import React, {useState} from 'react'

const WorkOrderDetails = ({ data, isStatus = false, save }) => {
      const [status, setStatus] = useState("");

    return (
        <div>
            <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-6 border-b border-[#00ffcc]/60 pb-1 ">
                Work Order Details
            </h2>

            {isStatus && (
                <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                    <div className="space-y-1">
                        <SelectInput
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            label='Status'
                            options={[
                                { value: "ORAS", label: "Order Created" },
                                { value: "NOCO", label: "Order Completed" }
                            ]}
                        />

                    </div>
                    <div className="space-y-1">
                        <NextButton label='Save' onClick={() => save(status)} />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div className="space-y-1">
                    <p><span className="font-semibold ">Notification Date:</span> {data.workOrderDetails.notificationDate}</p>
                    <p><span className="font-semibold ">Notification Number:</span> {data.workOrderDetails.notificationNumber}</p>
                    <p><span className="font-semibold ">Order Description:</span> {data.workOrderDetails.orderDescription}</p>
                </div>
                <div className="space-y-1">
                    <p><span className="font-semibold ">Order Number:</span> {data.workOrderDetails.orderNumber}</p>
                    <p><span className="font-semibold ">Order Status:</span> {data.workOrderDetails.orderStatus}</p>
                    <p><span className="font-semibold ">Reported By:</span> {`${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`}</p>
                </div>
            </div>

            <h3 className="text-md text-center font-semibold mt-6 mb-2 ">
                Header Data
            </h3>
            {data.headerData?.map((item, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-8 mb-8  text-sm">
                    <div className="space-y-1">
                        <p><span className="font-semibold ">End Date:</span> {item.endDate}</p>
                        <p><span className="font-semibold ">Equipment Description:</span> {item.equipmentDescription}</p>
                        <p><span className="font-semibold ">Equipment Number:</span> {item.equipmentNumber}</p>
                        <p><span className="font-semibold ">Functional Location:</span> {item.functionalLocation}</p>
                        <p><span className="font-semibold ">Functional Location Description:</span> {item.functionalLocationDescription}</p>
                    </div>
                    <div className="space-y-1">
                        <p><span className="font-semibold ">Order Date:</span> {item.orderDate}</p>
                        <p><span className="font-semibold ">Order Description:</span> {item.orderDescription}</p>
                        <p><span className="font-semibold ">Order Number:</span> {item.orderNumber}</p>
                        <p><span className="font-semibold ">Order Type:</span> {item.orderType}</p>
                        <p><span className="font-semibold ">Planner Group:</span> {item.plannerGroup}</p>
                        <p><span className="font-semibold ">Priority:</span> {item.priority}</p>
                        <p><span className="font-semibold ">Start Date:</span> {item.startDate}</p>
                    </div>
                </div>
            ))}

            <h3 className="text-md text-center font-semibold mt-6 mb-2 ">
                Components Data
            </h3>
            {data.componentsData?.map((comp, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-8 mb-8  text-sm">
                    <div className="space-y-1">
                        <p><span className="font-semibold ">Material Description:</span> {comp.materialDescription}</p>
                        <p><span className="font-semibold ">Material Number:</span> {comp.materialNumber}</p>
                        <p><span className="font-semibold ">Quantity:</span> {comp.quantity}</p>
                    </div>
                    <div className="space-y-1">
                        <p><span className="font-semibold ">Reservation No:</span> {comp.reservationNo}</p>
                        <p><span className="font-semibold ">Storage Location:</span> {comp.storageLocation}</p>
                        <p><span className="font-semibold ">System Condition:</span> {comp.systemCondition}</p>
                    </div>
                </div>
            ))}

            <h3 className="text-md text-center font-semibold mt-6 mb-2 ">
                Costs Data
            </h3>
            {data.costsData?.map((cost, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-8 mb-8  text-sm">
                    <div className="space-y-1">
                        <p><span className="font-semibold ">Assembly:</span>{cost.assembly}</p>
                        <p><span className="font-semibold ">Cost Center:</span>{cost.costCenter}</p>
                        <p><span className="font-semibold ">Cost Center Description:</span>{cost.costcenterDescription}</p>
                    </div>
                    <div className="space-y-1">
                        <p><span className="font-semibold ">Estimated Costs:</span> {cost.estimatedCosts}</p>
                        <p><span className="font-semibold ">Settlement Receiver:</span> {cost.settlementReceiver}</p>
                    </div>
                </div>
            ))}

            <h3 className="text-md text-center font-semibold mt-6 mb-2 ">
                Operations Data
            </h3>
            {data.operationsData?.map((op, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-8 mb-8  text-sm">
                    <div className="space-y-1">
                        <p><span className="font-semibold ">Control Key:</span> {op.controlKey}</p>
                        <p><span className="font-semibold ">Duration:</span> {op.duration}</p>
                        <p><span className="font-semibold ">Main Workcenter:</span> {op.mainWorkcenter}</p>
                    </div>
                    <div className="space-y-1">
                        <p><span className="font-semibold ">Operation Description:</span> {op.operationDescription}</p>
                        <p><span className="font-semibold ">Operation No:</span> {op.operationNo}</p>
                        <p><span className="font-semibold ">Planned Manpower:</span> {op.plannedManpower}</p>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default WorkOrderDetails
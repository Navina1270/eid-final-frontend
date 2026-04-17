import React from 'react'

const NotificationDetails = ({data}) => {
    return (
        <div >
            <h2 className="text-xl font-bold text-center text-[#00ffcc] mb-6 border-b border-[#00ffcc]/60 pb-1">
                Notification Details
            </h2>

            <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div className="space-y-3">
                    <p><span className="font-semibold">Equipment:</span> {data.equipmentNumber}</p>
                    <p><span className="font-semibold">Equipment Description:</span> {data.equipmentDescription}</p>
                    <p><span className="font-semibold">Functional Location:</span> {data.functionalLocation}</p>
                    <p><span className="font-semibold">Functional Location Description:</span> {data.functionalLocationDescription}</p>
                    <p><span className="font-semibold">Long Text:</span> <span>{data.notificationLongText}</span></p>
                    <p><span className="font-semibold">Main Work Center:</span> {data.mainWorkCenter}</p>
                    <p><span className="font-semibold">Notification Date:</span> {data.notificationDate}</p>
                    <p><span className="font-semibold">Notification Number:</span> {data.notificationNumber}</p>
                </div>

                <div className="space-y-3">
                    <p><span className="font-semibold">Notification Status:</span> {data.notificationStatus}</p>
                    <p><span className="font-semibold">Notification Type:</span> {data.notificationType}</p>
                    <p><span className="font-semibold">Planner Group:</span> {data.plannerGroup}</p>
                    <p><span className="font-semibold">Priority:</span> {data.priority}</p>
                    <p><span className="font-semibold">Reported By:</span> {data.reportedBy}</p>
                    <p><span className="font-semibold">Required Start Date:</span> {data.requiredStart}</p>
                    <p><span className="font-semibold">Required End Date:</span> {data.requiredEnd}</p>
                    <p><span className="font-semibold">Short Text:</span> {data.notificationShortText}</p>
                </div>
            </div>


        </div>
    )
}

export default NotificationDetails
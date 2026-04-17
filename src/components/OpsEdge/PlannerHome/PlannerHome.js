import DonutChart from '../Common/Graphs/DonutChart/DonutChart'

const PlannerHome = () => {
    const barData = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        data: [
            {
                label: 'Dataset 1',
                value: [10, 20, 30],
            },
            {
                label: 'Dataset 2',
                value: [15, 25, 35],
            },
        ],
    }


    const donutData = {
        labels: ['Label A', 'Label B', 'Label C'],
        values: [10, 20, 30],
        title: 'Your Chart Title',
        avgCostPerWO: 1234.56
    }

    

    return (
        <div className='w-full h-96 p-4'>
            <div>PlannerHome</div>
            {/* <BarChart data={barData} legend={false} label={true} /> */}
            <DonutChart data={donutData} />
        </div>
    )
}

export default PlannerHome
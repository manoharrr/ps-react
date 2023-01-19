export function dataForChart(transactionData: any) {
    let newdata = transactionData.map((transaction: any) => {
        return {
            ...transaction,
            createdAt: new Date(Number(transaction.createdAt)).toDateString(),
        }
    })

    const groupBy = (keys: any[]) => (array: any[]) =>
        array.reduce((objectsByKeyValue: { [x: string]: any; }, obj: { [x: string]: any; }) => {
            const value = keys.map((key: string | number) => obj[key]).join('-');
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
    const groupByDate = groupBy(['createdAt']);

    let transformedData = groupByDate(newdata);

    const dataVariable = []
    for (const key in transformedData) {
        if (transformedData[key].length > 1) {
            let val = transformedData[key].reduce((obj: { credit: any; debit: any; }, cur: { transactionType: string; amount: any; }) => {
                if (cur.transactionType === "credit") {
                    return { ...obj, credit: obj.credit + cur.amount }
                }
                return { ...obj, debit: obj.debit + cur.amount }
            }, {
                credit: 0,
                debit: 0
            })
            dataVariable.push({
                name: key,
                ...val
            })
        }
        else {
            dataVariable.push({
                name: key,
                credit: transformedData[key][0].transactionType === "credit" ? transformedData[key][0].amount : 0,
                debit: transformedData[key][0].transactionType === "debit" ? transformedData[key][0].amount : 0
            })
        }

    }
    return dataVariable;

}
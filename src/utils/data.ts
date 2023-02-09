export function dataForChartNew(transactionData: any) {
    let newdata = transactionData.map((transaction: any) => {
        return {
            ...transaction,
            // createdAt: new Date(Number(transaction.createdAt)).toDateString(),
        }
    })

    const groupBy = (keys: any[]) => (array: any[]) =>
        array.reduce((objectsByKeyValue: { [x: string]: any; }, obj: { [x: string]: any; }) => {
            const value = keys.map((key: string | number) => obj[key]).join('-');
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});
    const groupByDate = groupBy(['createdAt']);
    const transformedData = groupByDate(newdata);
    const transformedDataNew = Object.keys(transformedData).reverse();

    const dataVariable: any[] = []
    let amount: number = 0;

    transformedDataNew.forEach(key => {
        if (transformedData[key][0].accountType === "credit_card") {
            if (transformedData[key][0].transactionType === "credit") {
                amount -= transformedData[key][0].amount
            }
            else {
                amount += transformedData[key][0].amount
            }
        }
        else {
            if (transformedData[key][0].transactionType === "credit") {
                amount += transformedData[key][0].amount
            }
            else {
                amount -= transformedData[key][0].amount
            }
        }
        dataVariable.push({
            name: new Date(Number(transformedData[key][0].createdAt)).toDateString(),
            credit: transformedData[key][0].transactionType === "credit" ? transformedData[key][0].amount : 0,
            debit: transformedData[key][0].transactionType === "debit" ? transformedData[key][0].amount : 0,
            amt: amount
        })
    });
    return dataVariable;

}
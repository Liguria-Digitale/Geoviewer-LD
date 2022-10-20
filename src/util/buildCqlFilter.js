//calcolo cql_filter
// valori tra apici ' (anche numerici)
// "IN" NON FUNZIONA: UTILIZZARE OR
// se layer POSTGIS lowercase di fields

// TODO: gestione chiavi multiple    



export default function(findOptions) {
    let expressions = []
    const field = findOptions.fields
    findOptions.values.split(',').forEach(value => {
        expressions.push(`${field}='${value}'`)
    });
    const cqlFilter = encodeURIComponent(expressions.join(' OR '))
    return cqlFilter
}
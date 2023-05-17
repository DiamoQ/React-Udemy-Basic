import "./app-filter.css";

function AppFilter(props) {

    const buttonsData = [
        {name: "all", label: "Все сотрудники", key: "12323"},
        {name: "like", label: "Сотрудники на повышение", key: "32132321"},
        {name: "more1000", label: "З/П больше 1000$", key: "2315422"},
    ]

    const buttons = buttonsData.map(({name, label,key}) => {
        const activeElement = props.filterState === name;
        const activeClass = activeElement ? 'btn-light' : "btn-outline-light";
        return <button type="button"
        className={`btn ${activeClass}`}
        key={key}
        onClick={() => props.onFilterSelect(name)}>
            {label}</button>
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export {AppFilter};
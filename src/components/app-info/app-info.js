import "./app-info.css";

function AppInfo({staff,  bonus}) {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании Фабрика Сайтов</h1>
            <h2>Общее число сотрудников: {staff}</h2>
            <h2>Премию получат: {bonus()}</h2>
        </div>
    )
}

export {AppInfo};
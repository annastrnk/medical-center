import { useDispatch, useSelector } from "react-redux";
import { setFilterParams } from "../../redux/slices/visitSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filterParams = useSelector((state) => state.visits.filterParams);

  const handleSearchChange = (e) => {
    dispatch(setFilterParams({ ...filterParams, search: e.target.value }));
  };

  const handleDoctorChange = (e) => {
    dispatch(setFilterParams({ ...filterParams, doctor: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    dispatch(setFilterParams({ ...filterParams, priority: e.target.value }));
  };

  return (
    <div className="filter-container mb-4">
      <form className="my-4" onSubmit={(e) => e.preventDefault()}>
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-4">
            <label className="form-label text-muted">
              Пошук за заголовком/описом
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Шукати..."
                value={filterParams.search}
                onChange={handleSearchChange}
              />
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label text-muted">Лікар</label>
            <select
              className="form-select shadow-sm"
              value={filterParams.doctor}
              onChange={handleDoctorChange}
            >
              <option value="all">Виберіть лікаря</option>
              <option value="Кардіолог">Кардіолог</option>
              <option value="Стоматолог">Стоматолог</option>
              <option value="Терапевт">Терапевт</option>
            </select>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label text-muted">Терміновість</label>
            <select
              className="form-select shadow-sm"
              value={filterParams.priority}
              onChange={handlePriorityChange}
            >
              <option value="all">Виберіть пріоритетність</option>
              <option value="Звичайна">Звичайна</option>
              <option value="Пріоритетна">Пріоритетна</option>
              <option value="Невідкладна">Невідкладна</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

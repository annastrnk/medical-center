import React, { useState } from "react";

import { useSelector } from "react-redux";
import VisitCard from "../visitCard/visitCard";
import VisitForm from "../visitForm/visitForm";

export default function VisitList() {
  const [showForm, setShowForm] = useState(false);
  const visits = useSelector((state) => state.visits.visits || []);
  const filterParams = useSelector((state) => state.visits.filterParams) || {
    search: "",
    doctor: "all",
    priority: "all",
  };
  const currentVisit = useSelector((state) => state.visits.visitToEdit);

  const filteredVisits = visits.filter((visit) => {
    const matchesSearch =
      filterParams.search === "" ||
      visit.title?.toLowerCase().includes(filterParams.search.toLowerCase()) ||
      visit.description
        ?.toLowerCase()
        .includes(filterParams.search.toLowerCase());

    const matchesDoctor =
      filterParams.doctor === "all" || visit.doctor === filterParams.doctor;

    const matchesPriority =
      filterParams.priority === "all" || visit.priory === filterParams.priority;

    return matchesSearch && matchesDoctor && matchesPriority;
  });

  console.log(
    "Priority values in visits:",
    visits.map((v) => v.priority)
  );
  console.log("Current filter priority:", filterParams.priority);
  console.log(visits[0]);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="row row-cols-2 row-cols-md-2 row-cols-lg-3 g-4 g-lg-5">
        {filteredVisits.map((visit) => (
          <div className="col" key={visit.id}>
            <VisitCard visit={visit} onShowForm={handleShowForm} />
          </div>
        ))}
      </div>

      {showForm && currentVisit && (
        <VisitForm isVisible={showForm} onClose={handleCloseForm} />
      )}
    </div>
  );
}

import React from "react";
import { useHistory } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  const history = useHistory();

  return (
    <main className="main">
      <section className="pageNotFound project__wrapper">
        <div className="pageNotFound__wrapper">
          <h1 className="pageNotFound__title">404</h1>
          <p className="pageNotFound__description">Страница не найдена</p>
        </div>
        <button className="project__link pageNotFound__back" onClick={() => history.goBack()}>Назад</button>
      </section>
    </main>
  );
}

export default PageNotFound;

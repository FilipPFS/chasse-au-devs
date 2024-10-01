"use client";

import addJobOffer from "@/app/actions/createJobOffer";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./FormJobOffer.module.css";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FormJobOffer = ({ isOpen, setIsOpen }: Props) => {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      )}
      <div className={styles.modal}>
        <form action={addJobOffer} className={styles.form}>
          <h2>Votre offre</h2>
          <section className={styles.formSection}>
            <h4>Informations</h4>
            <div className={styles.formBlock}>
              <label>Titre de l'offre</label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Ex: Développeur Full Stack"
              />
            </div>
            <div className={styles.formBlock}>
              <label>Nom de l'entreprise</label>
              <input type="text" name="companyName" placeholder="Ex: Fnac" />
            </div>
            <div className={styles.formBlock}>
              <label>Type de contrat</label>
              <select name="contract">
                <option value={"CDI"}>CDI</option>
                <option value={"CDD"}>CDD</option>
                <option value={"Intérim"}>Intérim</option>
                <option value={"Alternance"}>Alternance</option>
                <option value={"Stage"}>Stage</option>
                <option value={"Freelance"}>Freelance</option>
                <option value={"Associé"}>Associé</option>
              </select>
            </div>
          </section>
          <section className={styles.formSection}>
            <h4>Location</h4>
            <div className={styles.formBlock}>
              <label>Ville</label>
              <input
                type="text"
                name="location.city"
                placeholder="Ex: Montmagny"
              />
              <label>Pays</label>
              <input
                type="text"
                name="location.country"
                placeholder="Ex: France"
              />
              <label>Code Postale</label>
              <input
                type="text"
                name="location.zipcode"
                placeholder="Ex: 95360"
              />
            </div>
          </section>
          <section className={styles.formSection}>
            <h4>Salaire & Caractéristiques de travail</h4>
            <div className={styles.formBlock}>
              <label>Salaire</label>
              <section className={styles.formSelector}>
                <input type="text" name="salary" placeholder="Ex: 1900€" />
                <span> / </span>
                <select name="salarySelect">
                  <option value={"mois"}>mois</option>
                  <option value={"an"}>an</option>
                </select>
              </section>
            </div>
            <div className={styles.formBlock}>
              <label>Temps de travail</label>
              <select name="jobTime">
                <option>Temps Plein</option>
                <option>Temps Partiel</option>
              </select>
            </div>
            <div className={styles.formBlock}>
              <label>Type de travail</label>
              <select name="workingMethod">
                <option value={"Travail au bureau"}>Travail au bureau</option>
                <option value={"Travail Hybride"}>Travail Hybride</option>
                <option value={"100% Télétravail"}>100% Télétravail</option>
              </select>
            </div>
            <div className={styles.formBlock}>
              <label>Horaires de travail</label>
              <textarea
                name="schedules"
                placeholder="Format: Travail en journée / Repos le weekend / Travail en journée etc..."
              />
            </div>
          </section>
          <section className={styles.formSection}>
            <h4>Candidat recherché</h4>
            <div className={styles.formBlock}>
              <label>Technologies recherché</label>
              <textarea
                name="technologies"
                placeholder="Format: HTML / CSS / JavaScript / React"
              />
            </div>
            <div className={styles.formBlock}>
              <label>Expérience recherché</label>
              <section className={styles.formSelector}>
                <input type="number" name="exp_number" />
                <select name="exp_select">
                  <option value={"mois"}>mois</option>
                  <option value={"ans"}>ans</option>
                </select>
              </section>
            </div>
            <div className={styles.formBlock}>
              <label>Diplôme recherché</label>
              <select name="diploma">
                <option value={"Sans diplôme"}>Sans diplôme</option>
                <option value={"Bac"}>Bac</option>
                <option value={"BTS / DUT"}>BTS / DUT</option>
                <option value={"Licence"}>Licence</option>
                <option value={"Master"}>Master</option>
              </select>
            </div>
          </section>
          <section className={styles.formSection}>
            <h4>Description & Avantages</h4>
            <div className={styles.formBlockDesc}>
              <label>Description</label>
              <textarea
                name="description"
                className={styles.desc}
                placeholder="Description de l'offre (missions / profile recherché / lieu etc...)"
              />
            </div>
            <div className={styles.formBlock}>
              <label>Avantages</label>
              <textarea
                name="benefits"
                placeholder="Format: Prise en charge quoitidien du transport / Possibilité de télétravail etc..."
              />
            </div>
          </section>
          <button className={styles.btn}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default FormJobOffer;

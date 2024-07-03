"use client";

import Spinner from "@/components/Spinner";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const RecapitulatifEnregistrement = ({ params }: any) => {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    reference: "",
    name: "",
    lastname: "",
    profession: "",
    adresse: "",
    contact: "",
    lotissement: "",
    ilot: 0,
    lot: 0,
    category: "",
    superficie: 0,
    observation: "",
    file: "",
    isFirstBuyer: "",
    antecedant: [
      {
        vendeur: "",
        contactvendeur: "",
        adresseVendeur: "",
      },
    ],
  });

  const getRecapByID = async () => {
    try {
      setLoading(true); // Commence le chargement
      const res = await axios.post("/api/search/id", { id: id });
      if (res.data) {
        setData(res.data?.data);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false); // Termine le chargement, que ce soit un succès ou une erreur
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    getRecapByID();
  }, [id]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="py-8 px-7 print:px-0">
          <div className="flex justify-between items-center">
            <Image
              alt="marie dabou"
              src={"/assets/mairie.png"}
              width={120}
              height={120}
            />
            <div className="text-center">
              <h2 className="text-3xl">Chefferie</h2>
              <h2 className="text-3xl font-bold">GBOUGBÔ</h2>
              <h3 className="text-2xl">&quot;Bréké&quot;</h3>
            </div>
          </div>
          <div className="py-5 px-2 mx-auto max-w-2xl lg:py-16 print:px-0">
            <h2 className="text-3xl text-center">
              Réçu d&lsquo;enregistrement dans le guide villageois Gbougbo Bréké
            </h2>
          </div>
          <div>
            <section className="bg-white dark:bg-gray-900">
              <div className="py-5 px-4 print:px-0 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
                  {data?.name} {data?.lastname}
                </h2>
                <p className="mb-4 text-base font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">
                  N° Réf ATT:{data.reference}
                </p>
                <dl>
                  <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Details
                  </dt>
                  <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                    Adresse: {data.adresse} - Contact: {data.contact} - Ilot:{" "}
                    {data.ilot} - Lot: {data.lot} - Lotissement:{" "}
                    {data.lotissement}
                  </dd>
                </dl>
                <dl className="flex items-center space-x-6 print:space-x-0">
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                      Catégorie
                    </dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                      {data.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                      Superficie
                    </dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                      {data.superficie}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>

          <div className="py-5  mx-auto max-w-2xl lg:py-16 print:px-0">
            <h2>Antécédent</h2>
            {data?.antecedant.map((ant, index) => (
              <div key={index} className=" mt-10">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="reference"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vendu par
                  </label>
                  <input
                    disabled
                    type="text"
                    name="vendeur"
                    id="vendeur"
                    className="bg-green-100 @border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nom du vendeur"
                    required
                    value={ant.vendeur}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="contactvendeur"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    disabled
                    type="text"
                    name="contactvendeur"
                    id="contactVendeur"
                    className="bg-green-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Contact du vendeur"
                    required
                    value={ant.contactvendeur}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="contactvendeur"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Adresse
                  </label>
                  <input
                    disabled
                    type="text"
                    name="adresseVendeur"
                    id="adresseVendeur"
                    className="bg-green-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Contact du vendeur"
                    required
                    value={ant.adresseVendeur}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="py-3 px-4  h-[100px] bg-slate-50 mx-auto max-w-2xl lg:py-7 rounded-md print:hidden">
            Documents
          </div>

          <div className="w-full flex flex-row items-center justify-between mx-auto max-w-2xl print:invisible">
            <button
              onClick={handlePrint}
              className="inline-flex items-center px-5 py-2.5 mt-4  text-sm font-medium text-center text-white bg-gray-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Imprimer
            </button>
            <Link href={"/recaps"}>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                retour
              </button>
            </Link>
          </div>
          <div className="hidden w-full  print:flex justify-start items-end flex-col print:relative  ">
            <h5 className="underline mb-3">La chefferie</h5>
            {/* <Image
              alt="signature"
              src={"/assets/traiter-removebg-preview.png"}
              width={90}
              height={90}
            /> */}
            <div className="hidden w-full  print:flex justify-start items-end flex-col print:absolute top-5   ">
              {/* <Image
                alt="signature"
                src={"/assets/IMG_20240429_135009_115-removebg-preview.png"}
                width={90}
                height={90}
              /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecapitulatifEnregistrement;

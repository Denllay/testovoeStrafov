import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { FineData } from "../components/Fine/FineData";
import { FineSearch } from "../components/Fine/FineSearch";
import styles from "../styles/Home.module.scss";
import { FineData as IFineData } from "../types/fine";

const initialFineData: IFineData = {
  isError: false,
  isLoading: false,
  data: null,
};

const Home: NextPage = () => {
  const [fineData, setFineData] = useState<IFineData>(initialFineData);

  return (
    <div className={styles.container}>
      <Head>
        <title>Тестовое</title>
        <link href='https://fonts.googleapis.com/css2?family=Roboto&display=swap' rel='stylesheet'></link>
      </Head>

      <main className={styles.block_main}>
        <div>
          <div className={styles.block_logo}>
            {/* * тут либо скачивать целый шрифт для лишь одного логотипа, либо просто сделать svg, я выбрал svg */}
            <Image src='/logo.svg' width={170} height={34} />
          </div>

          <p className={styles.info}>Получение информации о штрафе по УИН</p>
          <FineSearch setData={setFineData} />
        </div>

        <FineData fineData={fineData} />
      </main>
    </div>
  );
};

export default Home;

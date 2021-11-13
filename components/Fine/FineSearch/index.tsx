import React, { Dispatch, SetStateAction, useState } from "react";
import { getFineByNumber } from "../../../shared/api/fine";
import { getLastCategory } from "../../../shared/lib/getLastCategory";
import { FineData } from "../../../types/fine";
import styles from "./styles.module.scss";

// * search и error можно выделить в отдельный хук, но так как это тестовое, это будет оверкилл

const checkIsValidSize = (size: number, validSizes: number[]) => {
  for (const validSize of validSizes) {
    if (size === validSize) {
      return true;
    }
  }

  return false;
};

interface Props {
  setData: Dispatch<SetStateAction<FineData>>;
}

export const FineSearch: React.FC<Props> = ({ setData }) => {
  const [error, setError] = useState("");
  const [helper, setHelper] = useState("");
  const [search, setSearch] = useState("");

  const onChangeSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const number = target.value.replace(/[\D]/, "");
    const lastCategory = getLastCategory(number);
    const isNotValidSize = !checkIsValidSize(number.length, [0, 19, 20, 24, 25]);

    if (isNotValidSize) {
      setError("УИН должен иметь длинну 20 или 25 цифр!");
    } else {
      setError("");
    }

    setSearch(number);
    setHelper(lastCategory);
  };

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const isValidSize = checkIsValidSize(search.length, [20, 25]);

      if (isValidSize) {
        setData((prev) => ({ ...prev, isLoading: true }));
        const data = await getFineByNumber(search);

        setData((prev) => ({ ...prev, isLoading: false, isError: false, data }));
      }
    } catch (e) {
      setData((prev) => ({ ...prev, isLoading: false, isError: true, number: search }));
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.main} onSubmit={onSubmit}>
          <input
            value={search}
            onChange={onChangeSearch}
            className={styles.field}
            pattern='[0-9]*'
            type='text'
            placeholder='Введите УИН'
          />
          <button type='submit' className={styles.button}>
            Найти
          </button>
        </form>

        {error && <span className={styles.error}>{error}</span>}
      </div>

      {/* в боевом проекте конечно же есть ui popper и error, что бы не писать условия в jsx, но так как это тестовое, можно позволить такое допущение */}

      {helper && (
        <div className={styles.popper}>
          <span className={styles.popper_text}>{helper}</span>
        </div>
      )}
    </>
  );
};

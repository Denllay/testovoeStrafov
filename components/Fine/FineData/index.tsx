import { GetFineByNumberApiResponse } from "../../../shared/api/fine/model";
import { FineData as IFineData } from "../../../types/fine";
import { Loading } from "../../Loading";
import { FineError } from "../FineError";
import styles from "./styles.module.scss";

interface Props {
  fineData: IFineData;
}

type FineDataItemListConfig = {
  [key in FineDataItem]: string;
};

type FineDataItem = keyof GetFineByNumberApiResponse;

const fineDataItemListConfig: Partial<FineDataItemListConfig> = {
  doc_number: "Свидетельство о регистрации",
  bill_at: "Дата поставления",
  koap_code: "Нарушение",
  payee_username: "Получатель платежа",
  payee_inn: "ИНН",
  payee_kpp: "КПП",
  payee_bank_account: "Расчетный счет",
  payee_bank_name: "Банк получателя",
  payee_bank_bik: "БИК",
  payee_oktmo: "ОТКМО",
  kbk: "КБК",
  amount: "Сумма штафа",
  discount_size: "Скидка",
  amount_to_pay: "К оплате",
};

const unknownFlag = "-";

export const FineData: React.FC<Props> = ({ fineData }) => {
  const { isError, isLoading, data, number: searchNumber = "" } = fineData;

  if (isError) return <FineError number={searchNumber} />;

  if (isLoading) return <Loading />;

  if (!data) return null;

  const fineDataItemListEl = Object.entries(fineDataItemListConfig).map(([key, value]) => {
    const dataItem = data?.[key as FineDataItem] || unknownFlag;

    return (
      <li key={key} className={styles.fines_item}>
        <span className={styles.fines_item_key}>{value}:</span>
        <span className={styles.fines_item_value}>{dataItem}</span>
      </li>
    );
  });

  return (
    <div className={styles.main}>
      <h3 className={styles.fines_title}>Постановление #{data?.number || unknownFlag}</h3>

      <ul>{fineDataItemListEl}</ul>
    </div>
  );
};

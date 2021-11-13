import Image from "next/image";
import styles from "./styles.module.scss";

interface Props {
  number: string | undefined;
}

export const FineError: React.FC<Props> = ({ number }) => {
  return (
    <div className={styles.main}>
      <Image src='/not_found.svg' width={92} height={92} />
      <span className={styles.text}>Штраф {number} не найден</span>
    </div>
  );
};

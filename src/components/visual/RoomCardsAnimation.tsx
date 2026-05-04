import Image from "next/image";
import imgMain1 from "@/assets/images/main/img_main_1.svg";
import imgMain2 from "@/assets/images/main/img_main_2.svg";
import imgMain3 from "@/assets/images/main/img_main_3.svg";
import styles from "./RoomCardsAnimation.module.css";

export function RoomCardsAnimation() {
  return (
    <div className="relative mt-8 h-[214px] w-full max-w-[335px]">
      <div className={`${styles.previewCard} ${styles.previewCard1}`}>
        <Image src={imgMain1} alt="" className="size-full" />
      </div>
      <div className={`${styles.previewCard} ${styles.previewCard2}`}>
        <Image src={imgMain2} alt="" className="size-full" />
      </div>
      <div className={`${styles.previewCard} ${styles.previewCard3}`}>
        <Image src={imgMain3} alt="" className="size-full" />
      </div>
    </div>
  );
}

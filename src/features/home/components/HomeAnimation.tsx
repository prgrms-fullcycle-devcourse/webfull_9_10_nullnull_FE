import Image from "next/image";
import imgMain1 from "@/assets/images/main/img_main_1.svg";
import imgMain2 from "@/assets/images/main/img_main_2.svg";
import imgMain3 from "@/assets/images/main/img_main_3.svg";
import styles from "./HomeAnimation.module.css";

export function HomeAnimation() {
  return (
    <div className="relative mt-8 h-[214px] w-full max-w-[335px]">
      <div className={`${styles.mainPreviewCard} ${styles.mainPreviewCard1}`}>
        <Image src={imgMain1} alt="" className="size-full" />
      </div>
      <div className={`${styles.mainPreviewCard} ${styles.mainPreviewCard2}`}>
        <Image src={imgMain2} alt="" className="size-full" />
      </div>
      <div className={`${styles.mainPreviewCard} ${styles.mainPreviewCard3}`}>
        <Image src={imgMain3} alt="" className="size-full" />
      </div>
    </div>
  );
}

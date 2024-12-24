import * as React from "react";
import { ImageUpload } from "../../uploadImage/uploadImage";
import { NavigationButton } from "./navigateBtn";
import styles from '../register.module.css'

interface step3Props {
    handleStep: (data: object | null, more?: boolean) => void;
    googleImage: string | null;
}
const Step3: React.FC<step3Props> = ({ handleStep, googleImage }) => {
    const [imageUrl, setImageUrl] = React.useState<any>(googleImage);
    return (

        <div className={styles.step1Container}>
            <div className="flex flex-col items-start mt-4 w-full max-md:mt-10 max-md:max-w-full self-center">
                <h1 className="self-center mt-9 text-3xl font-bold text-right text-neutral-950">
                    תמונה אחת שווה אלף מילים!
                </h1>
                <p className="self-center mt-0 text-base text-right text-neutral-950">
                    רוצה שהשכנים יזהו אותך? הוסיפ/י תמונת פרופיל מתאימה (לבחירתך).
                </p>
                <br />
                {imageUrl && <img
                    src={imageUrl}
                    alt=""
                    className="object-contain shrink-0 w-16 aspect-square rounded-full self-center"
                />}
                <section className="flex flex-wrap gap-8 items-start self-stretch w-full text-sm max-md:max-w-full mt-7">
                    <div className="flex flex-wrap grow shrink gap-3 items-start min-w-[240px] w-[100%] max-md:max-w-full" >

                        <ImageUpload setImageUrl={setImageUrl} />
                    </div>
                </section>

                <div className="flex gap-3 items-start mt-16 max-md:mt-10" />
                <div className="flex gap-5 justify-between mt-9 ml-10 max-w-full text-base font-medium text-center text-white whitespace-nowrap w-[100%] max-md:mt-10">
                    <NavigationButton label="הקודם" onClick={() => { handleStep(imageUrl, false) }} />
                    <NavigationButton label={imageUrl ? "הבא" : "דלג"} onClick={() => { handleStep({ imageUrl: imageUrl }) }} />
                </div>
            </div>
        </div>

    );
};

export default Step3;
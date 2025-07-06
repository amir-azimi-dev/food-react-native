import { supabase } from "@/libs/supabase";
import { useEffect, useState } from "react";

function useProductImage(image?: string | null) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!image) return;

        (async () => {
            if (!image) return;

            const { data, error } = await supabase.storage.from("product-images").download(image);
            if (error) return;

            const fileReader = new FileReader();
            fileReader.readAsDataURL(data);
            fileReader.onload = () => (typeof fileReader.result === "string") && setImageUrl(fileReader.result);
        })();

    }, [image]);

    return [imageUrl, setImageUrl];
};

export default useProductImage;
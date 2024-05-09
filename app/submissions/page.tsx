"use client";

import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import {collection, getDocs} from "@firebase/firestore";
import {firestore} from "@/utils/firebase";
import Image from "next/image";
import {options} from "@/app/options";

export default function Submissions() {
    const [currentOptions, setCurrentOptions] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const submissions = collection(firestore, "submissions");
        getDocs(submissions)
            .then((snapshot) => {
                let calculatedOptions: number[] = Array.from(new Array(options.length)).map(() => 0);
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    calculatedOptions[data.option - 1]++;
                });
                setCurrentOptions(calculatedOptions);
           })
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return (
            <Card className={"mb-16"}>
                <CardHeader>
                    <h1 className={"text-center text-2xl mx-auto mb-8"}>Se incarca...</h1>
                </CardHeader>
                <CardBody>
                    <Spinner size={"lg"} className={"mb-8"} />
                </CardBody>
            </Card>
        );
    return (
        <Card className={"mb-16"}>
            <CardHeader>
                <h1 className={"text-center text-2xl mx-auto mb-8"}>Optiuni selectate</h1>
            </CardHeader>
            <Divider />
            <CardBody className={"my-4"}>
                <div className="flex flex-col gap-8 mx-auto">
                    {options.map((image, index) => (
                        <div
                            key={index}
                            className={"flex items-center gap-8"}
                        >
                            <Image
                                src={"/options/" + image}
                                alt={"option"}
                                width={300}
                                height={300}
                            />

                            <h2 className={"text-3xl"}>{currentOptions[index]} / {currentOptions.reduce((value, last) => last + value)}</h2>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}
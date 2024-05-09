"use client";

import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import Image from "next/image";
import {Radio, RadioGroup} from "@nextui-org/radio";
import {Button} from "@nextui-org/button";
import {useState} from "react";
import {Divider} from "@nextui-org/divider";
import {Spinner} from "@nextui-org/spinner";
import {firestore} from "@/utils/firebase";
import {addDoc, collection} from "@firebase/firestore";
import {useRouter} from "next/navigation";
import Link from "next/link";

export const options = [
	"1.jpg", "2.png", "3.jpg", "4.png", "5.jpeg", "6.png"
]

export default function Home() {
	const router = useRouter();
	const [option, setOption] = useState("1");
	const [loading, setLoading] = useState(false);

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
				<h1 className={"text-center text-2xl mx-auto mb-8"}>Alege o optiune</h1>
			</CardHeader>
			<Divider />
			<CardBody>
				<Button
					as={Link}
					href={"/submissions"}
					className={"mx-auto mb-8"}
				>
					Vezi optiunile deja trimise
				</Button>

				<RadioGroup
					label={"Optiuni"} defaultValue={"1"}
					className={"flex flex-col mx-auto"}
					value={option}
					onChange={(e) => setOption(e.target.value)}
				>
					{options.map((option, index) => (
						<Radio
							key={index}
							value={(index + 1).toString()}
							className={"flex justify-center items-center pb-8"}
						>
							<Image
								src={`/options/${option}`}
								alt={option}
								width={500}
								height={500}
							/>
						</Radio>
					))}
				</RadioGroup>
			</CardBody>
			<Divider />
			<CardFooter>
				<Button
					type={"button"}
					onClick={() => {
						setLoading(true);

						const submissions: any = collection(firestore, "submissions");
						addDoc(submissions, { option })
							.then(() => router.push("/submissions"));
					}}
					size={"lg"}
					className={"mx-auto mb-1"}
				>
					Trimite
				</Button>
			</CardFooter>
		</Card>
	);
}

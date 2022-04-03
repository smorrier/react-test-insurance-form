import { Checkbox } from "@mui/material";
import React from "react";
import { IPackage } from "../../../../@types/Package";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import "./SelectInsurance.css"

const packages: IPackage[] = [
	{
		id: 1,
		name: 'Proteco Insurance', 
		description: 'Our most affordable package. Your personal belongings will be covered up to 15k$. This is perfect if you own a few belongings.',
		pricePerMonth: 12.5
	},
	{
		id: 2,
		name: 'Umbrella Insurance', 
		description: 'Our most popular package. Your personal belongings will be covered up to 30k$. This package also includes a free water sensor to detect a water leak in your home.',
		pricePerMonth: 37.73
	},
	{
		id: 3,
		name: 'Thor Insurance', 
		description: 'Nothing but the best. Your personal belongings will be covered up to 100k$. It even includes a protection against an alien invasion.',
		pricePerMonth: 79.30
	},
]

export default function SelectInsurance({ selectedPackage, setSelectedPackage }: { selectedPackage: IPackage | null, setSelectedPackage: (e: IPackage) => void }) {
	const onBuyNow = (_package: IPackage) => {
		setSelectedPackage(_package)
	}
	return <div className="SelectInsurance">
		<div className="Packages">
			{packages.map((_package) => {
				return (
					<div className="Package" key={_package.id}>
						<div className="NameAndPrice">
							<div className="NameContainer">
								<Checkbox 
									checked={_package.id === selectedPackage?.id}
									onClick={() => onBuyNow(_package)}
								/>
								<div>{_package.name}</div>
							</div>
							<div>{_package.pricePerMonth} $</div>
						</div>
						<div className="Description">{_package.description}</div>
						<div className="BuyNowButtonContainer">
							<PrimaryButton onClick={() => onBuyNow(_package)}>Buy Now</PrimaryButton>
						</div>
					</div>
				)
			})}
		</div>
		<div className=""></div>
	</div>
}
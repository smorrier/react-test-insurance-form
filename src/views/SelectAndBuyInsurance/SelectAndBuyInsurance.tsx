import React, { useState } from "react"
import { IPackage } from "../../@types/Package"
import CustomerForm from "./components/CustomerForm/CustomerForm"
import SelectInsurance from "./components/SelectInsurance/SelectInsurance"
import "./SelectAndBuyInsurance.css"

export default function SelectAndBuyInsurance() {
	const [selectedPackage, setSelectedPackage] = useState<IPackage | null>(null)
	return (
		<div className="SelectAndBuyInsurance">
			<SelectInsurance 
				selectedPackage={selectedPackage} 
				setSelectedPackage={setSelectedPackage} 
			/>
			<CustomerForm selectedPackage={selectedPackage} />
		</div>
	)
}
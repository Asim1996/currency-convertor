const axios=require('axios');
// const getExchangeRate=(from,to)=>{
// 	return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response)=>{
// 		return response.data.rates[to];
// 		})
// }
const getExchangeRate=async (from,to)=>{
	try{
		const response=await axios.get(`https://api.fixer.io/latest?base=${from}`);
		const rate=response.data.rates[to];
		if(rate){
			return rate;
		}else{
			throw new Error();
		}

	}catch(e){
		throw new Error(`Unable to get exchanged rate for ${from} to ${to}`);
	}
	}
// const getCountries=(currencyCode)=>{
// 	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response)=>{
// 		return response.data.map((country)=>country.name)
// 	})

// }
const getCountries=async (currencyCode)=>{
	try{
		const response=await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
	return  response.data.map((country)=>country.name);
	}catch(e){
		throw new Error(`Unable to get countries that use ${currencyCode}`)
	}

	
}

const convertCurrency=(from,to,amount)=>{
let countries;
	return getCountries(to).then((tempCountries)=>{
		countries=tempCountries;
		return getExchangeRate(from,to).then((rate)=>{
			const exchangeamount=rate*amount;
			return `${amount} ${from} is worth ${exchangeamount} ${to}.${to} can be used in the following countries:${countries.join(', ')}`
		})
	})
}
const convertCurrencyAlt=async (from,to,amount)=>{
	const countries=await getCountries(to);
	const rate=await getExchangeRate(from,to);
		const exchangeamount=rate*amount;
			return `${amount} ${from} is worth ${exchangeamount} ${to}.${to} can be used in the following countries:${countries.join(', ')}`	

}
convertCurrencyAlt('USD','CAD',100).then((status)=>{
	console.log(status);
}).catch((e)=>{
	console.log(e.message);
})
convertCurrency('INR','USD',100).then((status)=>{
	console.log(status);
})
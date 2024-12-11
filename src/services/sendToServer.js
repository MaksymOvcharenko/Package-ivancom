import axios from 'axios';




const sendShipmentData = async (state) => {
    console.log(state);
    const stateData= state.form
    const sender = stateData.sender;
    const receiver = stateData.receiver;
    const senderAddress = stateData.senderAddress.senderAddress.senderAddress;
    const senderAddressPostomat = stateData.senderAddressPostomat;
    const recipientAddress = stateData.deliveryAddress;
    const parcel = stateData.parcel;
    const payment = stateData.value;
    const gabarytes = {
        A: { length: 64, width: 38, height: 8, weightActual: 4.86 },
        B: { length: 64, width: 38, height: 19, weightActual: 11.55 },
        C: { length: 64, width: 38, height: 41, weightActual: 24.9 },
      };

        const calculateWeight = (type) => {
       
        const { length, width, height, weightActual } = gabarytes[type];
      
        
      
        // Об'ємна вага: переведення з кубічних метрів в кг (зазвичай використовують коефіцієнт 5000)
        const volumetricWeight = (length * width * height) / 4000 // об'ємна вага в кг
      
     
      
        // Повертаємо результат
        return {
            length: length,
            width: width,
            height: height,
            weight_actual: weightActual,
            weight_dimensional: volumetricWeight,     // фактична вага або об'ємна вага
        };
      };
    const typeDelivery = (stateData)=> { 
        if (stateData.deliveryType==="branch"){

        return "department"}
         return "address"
    }
    const typeRefCityDelivery = (stateData)=> { 
        if (stateData.deliveryType==="address"){
    
        return recipientAddress.DeliveryCityRef}
         return recipientAddress.cityRef
    }
    console.log(typeDelivery(stateData));
    
    console.log('Current state:', stateData);
  const data = {
    sender: {
      last_name: sender.lastName,
      first_name: sender.firstName,
      middle_name: '.',
      phone: sender.phone,
      email: sender.email,
      
    },
    recipient: {
      last_name: receiver.lastName,
      first_name: receiver.firstName,
      middle_name: '.',
      phone: receiver.phone,
      email: receiver.email,
    },
    senderAddress: {
      address_type: 'sender',
      country:  senderAddress.country ||'Poland',
      city: senderAddressPostomat.city || 'Krakow',
      street: senderAddressPostomat.street || 'Jana pawla II',
      building_number: senderAddressPostomat.build ||'154',
      postal_code: senderAddressPostomat.post_code ||'31-982',
      inpost_branch_number: senderAddress.postamat,
    },
    recipientAddress: {
      country: recipientAddress.country || 'Україна',
      city: recipientAddress.city,
      street: recipientAddress.street,
      building_number: recipientAddress.house,
      apartment_number: recipientAddress.apartment,
      np_city_ref: typeRefCityDelivery(stateData),
      np_branch: recipientAddress.warehouse || null,
      np_branch_ref: recipientAddress.warehouseRef|| null,
      delivery_method: typeDelivery(stateData),
    },
    parcel: {
      crate_name: parcel.size,
      length: calculateWeight(parcel.size).length,
            width: calculateWeight(parcel.size).width,
            height: calculateWeight(parcel.size).height,
            weight_actual: calculateWeight(parcel.size).weight_actual,
            weight_dimensional:calculateWeight(parcel.size).weight_dimensional,
      estimated_value: parcel.valuation,
      price: payment.allSumm,
      description: {
        contents: parcel.cargoDescription
        .map((item) => item.Description)
        .join(", "),
      },
    },
    payment: {
      method: 'card',
      amount: payment.allSumm,
      npPrice: payment.npPrice,
      priceCargo: payment.priceCargo,
      valuation: payment.valuation,
    },
  };
  console.log("Data to send:", data);
 
  try {
    const response = await axios.post('https://ivancom-server.onrender.com/generate-package', data); // Поменять на рендер апі
    console.log('Shipment successfully created:', response.data);
  } catch (error) {
    console.error('Error sending shipment data:', error.response ? error.response.data : error.message);
  }
};

export default sendShipmentData;

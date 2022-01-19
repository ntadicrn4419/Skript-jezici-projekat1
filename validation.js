function checkDate(value){
    const data = {
        allow: true,
        message: ""
    }
    const arr = value.split("-");
    if(arr.length != 3){
        data.allow = false;
        data.message = "Format datuma nije validan. Datum mora biti u obliku dd-mm-yyyy .";
        return data;
    }
    const dd = Number(arr[0]);
    const mm = Number(arr[1]);
    const yyyy = Number(arr[2]);

    if(!Number.isInteger(dd)){
        data.allow = false;
        data.message = "Dan u datumu nije validan(nije broj). Datum mora biti u obliku dd-mm-yyyy .";
        return data;
    }
    if(!Number.isInteger(mm)){
        data.allow = false;
        data.message = "Mesec u datumu nije validan(nije broj). Datum mora biti u obliku dd-mm-yyyy .";
        return data;
    }
    if(!Number.isInteger(yyyy)){
        data.allow = false;
        data.message = "Godina u datumu nije validna(nije broj). Datum mora biti u obliku dd-mm-yyyy .";
        return data;
    }
    if(dd > 31 || dd < 1){
        data.allow = false;
        data.message = "Dan u datumu nije validan. Dan mora biti izmedju 1 i 31. Datum mora biti u obliku dd-mm-yyyy .";
        return data;
    }
    if(mm > 12 || mm < 1){
        data.allow = false;
        data.message = "Mesec u datumu nije validan. Mesec mora biti izmedju 1 i 12. Datum mora biti u obliku dd-mm-yyyy .";
        return data;
    }
    return data;
}

module.exports = {
      checkDate
};
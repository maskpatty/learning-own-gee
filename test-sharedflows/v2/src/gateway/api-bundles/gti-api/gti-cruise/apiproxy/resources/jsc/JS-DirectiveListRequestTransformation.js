 function handleDOB(guestDob) {
     var parsedt = parseDate(guestDob);
     var age = calculateAge(parsedt, new Date());
     return age;
 }
 //parse date
 function parseDate(dateStr) {
     var dateParts = dateStr.split("-");
     return new Date(dateParts[0], (dateParts[1]), dateParts[2]);
 }

 //calculate Age
 function calculateAge(dateOfBirth, dateToCalculate) {
     var calculateYear = dateToCalculate.getFullYear();
     var calculateMonth = dateToCalculate.getMonth() + 1;
     var calculateDay = dateToCalculate.getDate();

     var birthYear = dateOfBirth.getFullYear();
     var birthMonth = dateOfBirth.getMonth();
     var birthDay = dateOfBirth.getDate();

     var age = calculateYear - birthYear;
     var ageMonth = calculateMonth - birthMonth;
     var ageDay = calculateDay - birthDay;

     if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
         age = age - 1;
     }
     return JSON.stringify(age);
 }

 try {

     var backendRequest = {
         "BookingNum": "",
         "Rate": {
             "Code": "",
             "AirPromo": {
                 "Type": ""
             }
         },
         "Currency": {
             "Code": ""
         },
         "Sailings": [{
             "Cruise": {
                 "Code": ""
             },
             "Cabins": [{
                 "Number": "",
                 "Category": {
                     "Code": ""
                 }
             }]
         }],
         "Guests": [{
             "SeqNumber": "",
             "Action": "",
             "FirstName": "",
             "LastName": "",
             "Age": {
                 "Code": "",
                 "Amount": ""
             },
             "BirthDate": "",
             "Gender": {
                 "Code": "",
                 "Description": ""
             },
             "Nationality": {
                 "Code": "",
                 "Name": ""
             },
             "Sailings": [{
                 "Cruise": {
                     "Code": ""
                 },
                 "Cabins": [{
                     "Number": "",
                     "Position": ""
                 }]
             }],
             "Transportation": [{
                 "Type": "",
                 "Description": "",
                 "Direction": "",
                 "City": {
                     "Code": "",
                     "Name": ""
                 },
                 "Class": ""
             }]
         }]
     };

     var actualRequest = context.getVariable("request.content");
     context.setVariable("clientRequest", actualRequest);

     var actualRequestObj = JSON.parse(actualRequest);

     var currencyCode = context.getVariable("request.header.currencyCode");
     var categoryCode = actualRequestObj.selectedRooms[0].categoryCode;
     var cruiseId = context.getVariable("proxy.pathsuffix");

     var cruiseCode = cruiseId.split("/")[1];

     backendRequest.Rate.Code = actualRequestObj.commonRateCode;
     backendRequest.Currency.Code = currencyCode;

     var backendsailingsArray = [];
     var backendGuestArray = [];

     for (var selectRoomObj = 0; selectRoomObj < actualRequestObj.selectedRooms.length; selectRoomObj++) {
         var emptyBackendGuestObject = JSON.parse(JSON.stringify(backendRequest.Guests[0]));
         var emptyBackendSailingsObj = JSON.parse(JSON.stringify(backendRequest.Sailings[0]));
         emptyBackendSailingsObj.Cabins[0].Category.Code = actualRequestObj.selectedRooms[selectRoomObj].categoryCode;
         emptyBackendSailingsObj.Cabins[0].Number = actualRequestObj.selectedRooms[selectRoomObj].cabin.number;
         emptyBackendSailingsObj.Cruise.Code = cruiseCode;
         backendsailingsArray.push(emptyBackendSailingsObj);

         if (actualRequestObj.selectedRooms[selectRoomObj] !== undefined && actualRequestObj.selectedRooms[selectRoomObj] !== null && actualRequestObj.selectedRooms[selectRoomObj].guests) {
             for (var selectGuestObj = 0; selectGuestObj < actualRequestObj.selectedRooms[selectRoomObj].guests.length; selectGuestObj++) {
                 var populatedBackendGuestObject = JSON.parse(JSON.stringify(emptyBackendGuestObject));
                 var actualGuestObj = actualRequestObj.selectedRooms[selectRoomObj].guests[selectGuestObj];
                 populatedBackendGuestObject.SeqNumber = JSON.stringify(actualGuestObj.seqNo);
                 populatedBackendGuestObject.Action = "N";
                 populatedBackendGuestObject.Age.Code = actualGuestObj.type;
                 if (actualGuestObj.dob) {
                     populatedBackendGuestObject.Age.Amount = handleDOB(actualGuestObj.dob);
                 } else {
                     populatedBackendGuestObject.Age.Amount = actualGuestObj.age;
                 }

                 populatedBackendGuestObject.FirstName = actualGuestObj.firstName;
                 populatedBackendGuestObject.LastName = actualGuestObj.lastName;
                 populatedBackendGuestObject.BirthDate = actualGuestObj.dob;
				 
                 if (actualGuestObj.gender === 'female') {
                     populatedBackendGuestObject.Gender.Code = "F";
                 } else if (actualGuestObj.gender === 'male') {
                     populatedBackendGuestObject.Gender.Code = "M";
                 } else {
                     populatedBackendGuestObject.Gender.Code = actualGuestObj.gender;
                 }

                 if (actualGuestObj.countryOfResidence) {
                     populatedBackendGuestObject.Nationality.Code = actualGuestObj.countryOfResidence;

                 } else {
                     delete populatedBackendGuestObject.Nationality;
                 }

                 populatedBackendGuestObject.Sailings[0].Cruise.Code = cruiseCode;
                 populatedBackendGuestObject.Sailings[0].Cabins[0].Number = actualRequestObj.selectedRooms[selectRoomObj].cabin.number;

                 if (actualRequestObj.transportation !== undefined && actualRequestObj.transportation !== null) {
                     populatedBackendGuestObject.Transportation[0].Direction = actualRequestObj.transportation.direction;
                     populatedBackendGuestObject.Transportation[0].Type = actualRequestObj.transportation.type;
                     populatedBackendGuestObject.Transportation[0].City.Code = actualRequestObj.transportation.code;
                     populatedBackendGuestObject.Transportation[0].Class = actualRequestObj.transportation.class;
                 } else {
                     delete populatedBackendGuestObject.Transportation;
                 }
                 backendGuestArray.push(populatedBackendGuestObject);

             }

         }

         backendRequest.Guests = backendGuestArray;
     }

     backendRequest.Sailings = backendsailingsArray;

     context.setVariable("request.content", JSON.stringify(backendRequest));
     context.setVariable("targetRequest", JSON.stringify(backendRequest));


 } catch (error) {

     throw error;
 }
function replacer(key, value) {
    if (value == "null") return "";
    else if (value == undefined) return "";
    else return value;
}


try {

	var targetResponse = context.getVariable('response.content');
	var targetResponseObj = JSON.parse(targetResponse);
	var transformedResopnseObj = targetResponseObj;
	context.setVariable('targetResponse', targetResponse);


	var sectionMapping = context.getVariable("sectionMapping");
	var sectionMappingObj = JSON.parse(sectionMapping);
    var multiSectionObj = {};                                                 //CarnivalCo-18026

	if (transformedResopnseObj && transformedResopnseObj.data.roomTypes && transformedResopnseObj.data.roomTypes.length > 0) {
      for (roomTypes = 0; roomTypes < transformedResopnseObj.data.roomTypes.length; roomTypes++) {
          if (transformedResopnseObj.data.roomTypes[roomTypes].categories && transformedResopnseObj.data.roomTypes[roomTypes].categories.length > 0) {
              for (categories = 0; categories < transformedResopnseObj.data.roomTypes[roomTypes].categories.length; categories++) {
                  if (transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections && transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections.length > 0) {
                      for (sectionIndex = 0; sectionIndex < transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections.length; sectionIndex++) {
						  var selectedSection = transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndex].sectionCode;
						  var section = sectionMappingObj[selectedSection];
						  if(section){
								transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndex].sectionCode = section;

                var tempSection = [];                                         //CarnivalCo-18026
                if (multiSectionObj[section]) {
                  tempSection = multiSectionObj[section];
                }
                tempSection.push(sectionIndex);
                multiSectionObj[section] = tempSection;

              }
                      }
                  }
              }
          }
      }
  }

  var roomTypes = 0;                                          //CarnivalCo-18026
  var categories = 0;
  var transformedSections = [];
  var flag;
  
  //sectionIndex
  for (var sectionName in multiSectionObj){
    var sectionIndexes = multiSectionObj[sectionName];
    if(sectionIndexes.length > 1) {
      for (sectionIndex = 1; sectionIndex < sectionIndexes.length; sectionIndex++) {
        if (transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[sectionIndex]].decks && transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[sectionIndex]].decks.length > 0) {
            for (currentDeck = 0; currentDeck < transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[sectionIndex]].decks.length; currentDeck++) {
                flag = false;
                if (transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks && transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks.length > 0) {
                    for (actualDeck = 0; actualDeck < transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks.length; actualDeck++) {
                        if (transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[sectionIndex]].decks[currentDeck].deckNumber === transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks[actualDeck].deckNumber) {
                            if(transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks[actualDeck].cabins) {
                                transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks[actualDeck].cabins.push.apply(transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks[actualDeck].cabins, transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[sectionIndex]].decks[currentDeck].cabins);
                            } else {
                                transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks[actualDeck].cabins = transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[sectionIndex]].decks[currentDeck].cabins;
                            }
                            flag = true;
                            break;
                        }  
                    }
                }
                if(flag === false){
                    if(transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks) {
                        transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks.push.apply(transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks, transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[sectionIndex]].decks);
                    } else {
                        transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]].decks = transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[sectionIndex]].decks;
                    }
                }
            }
        }
      }  
    }
    transformedSections.push (transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections[sectionIndexes[0]]);
  }
  
  transformedResopnseObj.data.roomTypes[roomTypes].categories[categories].sections = transformedSections;

	context.setVariable('response.content', JSON.stringify(transformedResopnseObj, replacer));
} catch (error) {

    throw error;
}	

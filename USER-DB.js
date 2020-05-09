var pool = require("./pool")

module.exports.getUsers = async (req) => {
    if (req.query.username && req.query.password) {
      let values = [req.query.username, req.query.password];
      // If set then limit to only a ticket linked to locations the user has access to

      let query = "SELECT userid, username FROM Users WHERE username = '" + req.query.username + "'";
      
      let result = await pool.query(query, values);
      if (result.length) 
      {
        return (result[0]);
      }
  
      return null;
    } else {
      console.error(new Date().toISOString(), req.path, `Cannot get users since request incomplete. Submitted from IP address ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  module.exports.registerUser = async (req) => {
    if (req.query.username && req.query.password && req.query.email) {
      console.log("Registering user:" + req.query.username);
      let query = "SELECT * FROM Users WHERE username = '" + req.query.username +"' OR email = '" + req.query.email + "'";
      let result = await pool.query(query);
      if (result.length) // User is already taken!
      {
        return "2";
      }
      else{
      let query2 = "INSERT INTO Users (username, password, email) VALUES ('" + req.query.username + "', '" + req.query.password + "','" + req.query.email + "')";
      let result2 = await pool.query(query2);
      return "1"; // All was added correctly.
      }
    } else {
      console.error(new Date().toISOString(), req.path, `Cannot get users since request incomplete. Submitted from IP address ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  module.exports.changePassword = async (req) => {
    if (req.query.username && req.query.password) {
      console.log("Registering user:" + req.query.username);

      let query2 = "INSERT INTO Users (username, password) VALUES ('" + req.query.username + "', '" + req.query.password + "','" + req.query.email + "')";
      let result2 = await pool.query(query2);
      return "1"; // All was added correctly.
      
    } else {
      console.error(new Date().toISOString(), req.path, `Cannot get users since request incomplete. Submitted from IP address ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  module.exports.searchall = async (req) =>{
    let query = "SELECT pdflocation, fileid, author, description, filelocation FROM OER WHERE tags like '%" + req.query.keywords + "%' OR subject like " + "'%" + req.query.keywords + " %'";
    let results = await pool.query(query);
    if (!results.length)
    {
      return 0;
    }
    else
    {
      return results;
    }
  }

  module.exports.search = async (req) => {
    let query = "SELECT * FROM OER WHERE tags like '%" + req.query.keywords + "%'";
    let results = await pool.query(query);
    let CCCtags = 
    ["Patterns","Cause and Effect", "Scale, Proportion, and Quantity", "Systems and System Models", "Energy and Matter", 
    "Cause", "Effect", "Scale", "Proportion", "Quantity", "System", "System Models", "Function",
     "Structure", "Stability", "Change", "Interdependence", "Stability", "Influence", 
     "Interdependence", "Lab", "Energy", "Matter", "Energy and Matter", "Structure and Function", 
     "Stability and Change", "Interdependence of Science, Engineering, and Technology",  
     "Influence of Engineering, Technology, and Science on Society and the Natural World", "Society", "Natural World", "Influence", "Real life", "Labs", 
     "Phenomena", "Pattern", "Organization", "Classification", "Relationship", "Relationships", "Causes", "Events", "Time scale", "Energy Scale", "Size Scale",
    "Proportional", "Tracking", "Behavior", "Stability", "Rate of change", "Change", "Limitations", "Predict", "Influence", "Performance", "Model", "Models",
  "Testing", "Relevant", "Compare", "Contrast", "Compare and Contrast"];
    
    let DCItags = 
    ["Structure and Properties of Matter", "Chemical Reactions", "Nuclear Processes", "Forces and Motion", "Types of Interactions", "Definitions of Energy", "Conservation of Energy and Energy Transfer", "Properties of Matter", "Chemical", "Reactions", "Nuclear", "Reactions", "Forces", "Motion", "Interactions", "Conservation", "Forces", "Motion",
    "Relationship Between Energy and Forces", "Energy in Chemical Processes and Everyday Life", "Chemical Processes", "Energy", "Electromagnetic", "Radiation", "Information technology", "Instrumentation", "Function", "Technology", "Instrumentation", "Growth", "Development", "Organisms", "Information", "Processing", "Cycles", "Cycles of Matter", 
    "Traits", "Evidence", "Common Ancestry", "Diversity", "Climate change", "Hazard", "Adaptation", "Biodiversity", "Humans", "Universe", "Stars", "Solar system", "Social Interactions", "Weather", "Climate", "Biogeolgy", "Natural", "Resources", "Engineering", "Engineering Problem", "Solutions", "Design", "Design solutions", "Human Impact", "Impact",
    "Water", "Earth", "Materials", "Plate Tectonics", "Information", "Large-Scale",
    "Wave Properties", "Electromagnetic Radiation", "Information Technologies and Instrumentation", 
    "Structure and Function", "Growth and Development of Organisms", "Growth and Development of Organisms", "Information Processing", 
    "Interdependent Relationships in Ecosystems", "Cycles of Matter and Energy Transfer in Ecosystems", 
    "Ecosystems Dynamics, Functioning and Resilience", "Social Interactions and Group Behavior", 
    "Inheritance of Traits", "Variation of Traits", "Evidence of Common Ancestry and Diversity", "Natural Selection", 
    "Natural Selection", "Adaptation", "Biodiversity and Humans", "The Universe and its Stars", "Earth and the Solar System", 
    "The History of Planet Earth", "Earth Materials and Systems", "Plate Tectonics and Large-Scale Systems", 
    "The Role of Water in Earth’s Surface Processes", "Weather and Climate", "Biogeology", "Natural Resources", 
    "Natural Hazards", "Human Impacts on Earth Systems", "Global Climate Change", 
    "Defining and Delimiting and Engineering Problem", "Developing Possible Solutions", "Optimizing the Design Solution"]
    let PItags = ["Quiz", "Assessment", "Test", "Exam"];
    let Practicetags = 
    ["Asking Questions and Defining Problems", "Developing and Using Models", "Planning and Carrying Out Investigations", "Analyzing and Interpreting Data", "Using Mathematics and Computational Thinking", 
    "Constructing Explanations and Designing Solutions", "Engaging in Argument from Evidence", "Obtaining, Evaluating, and Communicating Information", "Questions", "Problems", "Model", "Models", "Investigation", "Investigations", 
    "Analyzing", "Interpreting", "Data", "Computational", "Thinking", "Explanations", "Constructing", "Solutions", "Designing", "Evidence", "Argument", "Communication", "Communicating", "Information", "Evaluating", "Planning", "Asking questions"];

    let CCCmatches = [];
    let DCImatches = [];
    let PImatches = [];
    let Practicematches = [];

    for (let i = 0; i < results.length; i++){
      for(let y = 0; y < CCCtags.length; y++){
        let tags = results[i].tags;
        let description = results[i].description;
        console.log(description);
        if(tags.includes(CCCtags[y])){
          CCCmatches.push(results[i]);
        }
        if(tags.includes(DCItags[y])){
          DCImatches.push(results[i]);
        }
        if(tags.includes(PItags[y])){
          PImatches.push(results[i]);
        }
        if(tags.includes(Practicetags[y])){
          Practicematches.push(results[i]);
        }
      }
    }

    let matches = [CCCmatches, DCImatches, PImatches, Practicematches];

    // At this point, we have all of the results that match one of the 4 categories of standards
    // Now we want to sort through
    // Score: other params are 3, general tags are 1

    let final = [];
    let reasons = "";
    for(var z = 0; z < 4; z++){
      let bestEntry;
      let bestEntryScore = 0;
      let bestReasons = "";
      for(var x = 0; x < matches[z].length; x++){
        let entry = matches[z][x];
        let entryScore = 0;
        let entryReasons = "";
        if(matches[z][x].grade == req.graveLevel){
          entryScore = entryScore + 3;
          entryReasons = entryReasons + "1";
        }else{
          entryReasons = entryReasons + "0";
        }
        if(matches[z][x].subject == req.subject){
          entryScore = entryScore + 3;
          entryReasons = entryReasons + "1";
        }else{
          entryReasons = entryReasons + "0";
        }
        if(matches[z][x].contentType == req.contentType){
          entryScore = entryScore + 3;
          entryReasons = entryReasons + "1";
        }else{
          entryReasons = entryReasons+ "0";
        }

        if(entryScore >= bestEntryScore){
          bestEntry = entry;
          bestEntryScore = entryScore;
          bestReasons = entryReasons;
        }
      }
      if(bestReasons != ""){
        reasons = reasons + bestReasons;
      }else{
        reasons = reasons + "000";
      }
      final.push(bestEntry);
    }

    console.log(reasons);
    final.push(reasons);
    
    return final;
  };

  module.exports.upload = async (req) => {
    var description = req.query.description;
    var license = req.query.license;
    var subject = req.query.subject;
    var fileTitle = req.query.fileTitle;
    var grade = req.query.graveLevel;
    var tags = req.query.tags;
    var video = req.query.video;
    var labs = req.query.labs;
    var exams = req.query.exams;
    var worksheets = req.query.worksheets;
    var meda_format = "";

    if (video != "")
    {
      media_format += video + ",";
    }
    if (labs != "")
    {
      media_format += labs + ",";
    }
    if (exams != "")
    {
      media_format += exams + ",";
    }
    if (worksheets != "")
    {
      media_format += worksheets + ",";
    }
    insert_statement = "INSERT INTO OER (userid, author, filelocation, description, name, subject, mediaformat, license, dateadded, grade, upvotes) VALUES (0,{0},{1},{2},{3},{4},{5},{6},{7},{8},{9},{10});".format(author, fileTitle,description,name,subject,media_format, license,date_added,grade,0,tags,"none")
    if (req.query.description) {
      r = r + "Content Description:" + "Content Description";
      console.log("contentDescription found!")
      return r; // All was added correctly.
    } 
    
    else {
      console.error(new Date().toISOString(), req.path, `Search result was incomplete ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
      return Promise.reject();
    }
  };

  
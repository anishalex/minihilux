import React , {useState, useEffect, useContext, Component} from 'react';
import {View,Text, Image, Dimensions, Linking, FlatList,StyleSheet,ScrollView, TextInput, TouchableOpacity, NativeModules, Alert} from 'react-native';
import WebView from 'react-native-webview';
import base64 from 'react-native-base64'
import DeepLinking from 'react-native-deep-linking';



const init_uaepass_auth_string= "https://qa-id.uaepass.ae/trustedx-authserver/oauth/main-as?redirect_uri=https://ajm.re/eservices/index.php/site/uaePassCallBackMobile&client_id=ajmanre_mobile_stage&response_type=code&state=ShNP22hyl1jUU2RGjTRkpg==&scope=urn:uae:digitalid:profile:general&acr_values=urn:safelayer:tws:policies:authentication:level:low&ui_locales=en";



const hilux_blurb_en ='The Land and Real Estate Department of Ajman was established by Emiri Decree No. 7 of 2017 issued by His Highness Sheikh Humaid bin Rashid Al Nuaimi, Member of the Supreme Council and Ruler of Ajman, and is the legal successor to the Land and Property Department and the Real Estate Regulatory Authority. Hamid al-Nuaimi. The Department aims to develop policies, plans and studies related to urban development and introduce the real estate market of Ajman to encourage internal investments and to attract foreign investments in the field of development and implementation of real estate projects in the Emirate. It also works on drafting legislation and legal systems to license real estate developers and real estate offices Supervising the practice of their activities, organizing joint ownership in the real estate development projects and taking the measures and administrative and legal procedures for the term of all real estate disputes.';
const hilux_blurb_ar ='تأسست دائرة الأراضي والعقارات بعجمان بموجب المرسوم الأميري رقم (7) لسنة 2017 الصادر عن صاحب السمو الشيخ حميد بن راشد النعيمي عضو المجلس الأعلى حاكم عجمان ، والخلف القانوني لدائرة الأراضي والأملاك. وهيئة التنظيم العقاري. حميد النعيمي. تهدف الدائرة إلى وضع السياسات والخطط والدراسات المتعلقة بالتنمية الحضرية وإدخال سوق العقارات في عجمان لتشجيع الاستثمارات الداخلية وجذب الاستثمارات الأجنبية في مجال تطوير وتنفيذ المشاريع العقارية في الإمارة. كما تعمل على صياغة التشريعات والأنظمة القانونية لترخيص المطورين العقاريين والمكاتب العقارية الإشراف على ممارسة أنشطتهم وتنظيم الملكية المشتركة في مشاريع التطوير العقاري واتخاذ الإجراءات والإجراءات الإدارية والقانونية لمدة جميع العقارات. النزاعات';





const HomeScreen = props => {      
  
  const [modalVisible, setModalVisible] = useState(false);  
  const [modalValid, setModalValid] = useState(false);  
  const [modalData, setModalData] = useState({});  
  


  const ValidProfile = props => {
    return (
        <View style={{flex:1, backgroundColor:"white", justifyContent:"center", alignItems:"center", marginHorizontal:20, marginVertical:100, borderRadius:30}}>            
            <View style={{flex:1, justifyContent:"center", alignItems:"flex-start", paddingStart:20}}>
        
                <View style={{ flexDirection:"row"}}>
                    <Text medium={true} style={{fontSize:20, color:"purple"}}>Name: </Text>
                    <Text style={{fontSize:20}}>{modalData.firstnameEN}</Text>
                </View>
                <View style={{ flexDirection:"row"}}>
                    <Text medium={true} style={{fontSize:20, color:"purple"}}>Nationality: </Text>
                    <Text style={{fontSize:20}}>{modalData.nationalityEN}</Text>
                </View>
                <View style={{ flexDirection:"row"}}>
                    <Text medium={true} style={{fontSize:20, color:"purple"}}>Mobile</Text>
                    <Text style={{fontSize:20}}>{modalData.mobile}</Text>
                </View>
                <View style={{ flexDirection:"row"}}>
                    <Text medium={true} style={{fontSize:20, color:"purple"}}>Email:</Text>
                    <Text style={{fontSize:20}}>{modalData.email}</Text>
                </View>
                <View style={{ flexDirection:"row"}}>
                    <Text medium={true} style={{fontSize:13, color:"purple"}}>UUID: </Text>
                    <Text style={{fontSize:12}}>{modalData.uuid}</Text>
                </View>                            
            </View>
  
        </View>
  
    );
        
    
  }
  
  const InvalidProfile = props => {
    return (
        <View style={{flex:1, backgroundColor:"white", justifyContent:"center", alignItems:"center", marginHorizontal:20, marginVertical:100, borderRadius:30}}>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
           
                <Text>Error</Text>
                <Text>{modalData.errormessage}</Text>
            </View>
        </View>
  
    );
        
    
  }
  
  
  
  async function getUAEPassProfile(bearerToken){
  
    let profileUrl = "https://qa-id.uaepass.ae/trustedx-resources/openid/v1/users/me";  
    
    try {
      let response = await fetch(profileUrl, {
        method: 'GET',
        headers: {                
          'Authorization': 'Bearer '+ bearerToken, 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "",
      });
      
      let jsonResult = await response.json();
      console.log("Profile response: ", jsonResult)
      
      let valid = ( "mobile" in jsonResult ? true:false )
      if (valid) {
        setModalData(jsonResult);
      }      else {
        errorObject = {errormesage:"Vaild mobile not found in UAEPass data"}
        setModalData(errorObject);
      }
      setModalValid(valid);      
      console.log("Profile validity:", valid)
      setModalVisible(true);

    } catch (error) {
      console.error(error);   
      setModalValid(false);
      setModalVisible(false);
    }
  
  }
  
  async function getUAEPassToken( authCode ) {
   
    const tokenUrl = "https://qa-id.uaepass.ae/trustedx-authserver/oauth/main-as/token?grant_type=authorization_code&redirect_uri=https://ajm.re/eservices/index.php/site/uaePassCallBackMobile&code=".concat(authCode) ;
    
    try {
      let response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {                
          'Authorization': 'Basic '+ base64.encode("ajmanre_mobile_stage:Qz3nvggbuu4q4frg"), 
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "",
        
      });
      
      let jsonResult = await response.json();
  
      console.log("Token response: ", jsonResult)
      let profileDetails = await getUAEPassProfile(jsonResult["access_token"])
      
      return (profileDetails);
          
    } catch (error) {
      console.error(error);   
    }
  
  }
  
  



const useMount = func => useEffect(() => func(), []);

function handleRunningDeepLink(event) {
  console.log("---------> event Deep Link uri: ",event.url);
}

const checkIncomingURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      Linking.addEventListener('url', handleRunningDeepLink);
      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
     console.log("---------> init Deep Link uri: ",initialUrl) 
     

    };

    getUrlAsync();
   

  });

  return { url, processing };
};



  class MyWeb extends Component {
  
    constructor () {
      super();
    }
    

    _onMessage(event){

        //console.log("**** Message Event: ", event)
        alert(event)
  
      }

    _onNavStateChange(navState){

      //console.log(">>>> Nav state: ", navState)

    }
  
    _onShouldStartLoadWithRequest(e){
  
        let load = false;

        //console.log("should Start event:", e)
  
        let code = "";
    
        if ( e.url.startsWith("uaepass://") ) {
            console.log("uaepass deep linking from shouldStartLoad: ", e.url)
            //modify the link as spec'ed in UAEpass docs
            let injectedURL = e.url.replace("https","hilux")
            console.log("injected url is: ", injectedURL);
            Linking.openURL(injectedURL);

        } else if ( (e.url.startsWith("https://ajm.re/") )  && ( e.url.includes("code=") )  ) {

            load = true;

            let codeResponseArray = e.url.split("?");
                if (codeResponseArray.length == 2) {
                let paramArray = codeResponseArray[1].split("&");
        
                for (let i=0; i< paramArray.length; i++) {
                    if (paramArray[i].includes("code=")){
        
                    code = paramArray[i].split("=")[1];
                    console.log("Received code: ", code)
        
                    return (getUAEPassToken(code)) ;
        
                    }
                }
        
                }
                
    
        } else if (e.url.startsWith("https://qa-id.uaepass.ae")) {
            console.log("uaepass load: ", e.url)
            load = true;
        } else if (e.url.startsWith("https://www.harrierlabs.com")) {
            console.log("harrier load: ", e.url)
            load = true;
        }
  
  
  
      return load;
    }

    
  
    render() {
        const jsCode = "window.postMessage(document.documentElement.innerHTML)"
      return (
        <WebView
          source={{ uri: init_uaepass_auth_string}}
          originWhitelist={['https://*', 'http://*','uaepass://*' ]}
          onMessage={event => {
              console.log("message event")
          }}
          javaScriptEnabled = {true}
          domStorageEnabled = {true}
          style={{ marginTop: 20, width:Dimensions.get('screen').width-50 }}
          onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
          onNavigationStateChange={this._onNavStateChange}
          injectedJavaScript={jsCode}
        />
      );
    }
  }




  function modalGenerator(){
    return(
        
        (modalValid?<ValidProfile/>:<InvalidProfile/>)
   
      );
  }


  
  //Linking.addScheme('uaepass://');
  //checkIncomingURL();
  const deepLinkHandler = ({ url }) => {
      
    console.log("deep link handler", url);
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  };

  Linking.addEventListener('url', deepLinkHandler);


  return (           
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      {modalVisible ? modalGenerator() : <MyWeb/> }
       

    </View>

  );
}

const styles = StyleSheet.create({

    aboutMasterContainer: {    
        flex:1,             
        marginTop:10,         
        marginBottom:50,  
        marginHorizontal:15 
        
      },

      imageWrapper: {    
        flex:1,             
        marginTop:10,         
        marginBottom:50,     
      },



      contentWrapper: {    
        flex:1,             
        marginTop:10,         
        marginBottom:50,     
      },


      buttonBlock: {    
        flex:1,             
        marginTop:10,         
        marginBottom:50,     
      },

      ajreLogo: {        
        height:Dimensions.get('screen').height-450,            
        width:Dimensions.get('screen').width-30,            
        justifyContent: "flex-end",
        borderRadius:20,


        resizeMode:"cover",    
      },      


});

export default HomeScreen;
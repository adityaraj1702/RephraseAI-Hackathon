import fetch from 'node-fetch'
import dotenv from "dotenv"
dotenv.config()

const bearerToken = process.env.REPHRASE_API

async function handler(req,res){
  const text = req.body;
  console.log(text);
  
  const url = 'https://personalized-brand.api.rephrase.ai/v2/campaign/create';
  const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json', "Authorization":bearerToken},
    body: JSON.stringify({
      title: '16:9 Widescreen',
      thumbnailUrl: 'https://rephrase-assets.s3.ap-south-1.amazonaws.com/template_thumbnails/cold_reachout_1.png',
      videoDimension: {height: 1080, width: 1920},
      scenes: [
        {
          elements: [
            {
              style: {height: '100%', width: '100%', position: 'absolute', zIndex: 1},
              asset: {
                kind: 'Image',
                use: 'Background',
                url: 'https://picsum.photos/seed/picsum/200/300',
              }
            },
            {
              style: {
                position: 'absolute',
                zIndex: 2,
                bottom: '0em',
                objectFit: 'cover',
                height: '37.5em',
                width: '66.66666666666667em',
                left: '16.666666666666664em'
              },
              asset: {
                kind: 'Spokesperson',
                spokespersonVideo: {
                  model: 'george_retrain_nt',
                  voiceId: 'GENEVIEVE_M__004',
                  output_params: {
                    video: {
                      crop: {preset: 'MS'},
                      resolution: {height: 720, width: 1280},
                      background: {alpha: 0}
                    }
                  },
                  gender: 'male',
                  transcript: `<speak>${text.text}</speak>`,
                  transcript_type: 'text'
                }
              }
            },
            {
              style: {
                variant: 'subheading',
                fontSize: '3em',
                fontFamily: 'Roboto',
                color: '#FFFFFF',
                position: 'absolute',
                zIndex: 15,
                align: 'left',
                height: '5.912361095419285em',
                width: '30.170754733240013em',
                bottom: '33.28846002860913em',
                left: '12.064089036806962em',
                fontColor: '#fffffc',
                textDecorationColor: '#631111',
               
               
              },
              asset: {
                kind: 'Text',
                text: `${text.text}`,
                textStyle: {
                  fontColor: '#fffffc',
                  fontWeight: "900",
                  fontSize: '2em',
                  textDecorationColor: '#fffffc'
                }
              }
            }
          ]
        }
      ]
    })
  };


  create(url,options)
  res.status(400).json(text);

}






var id;

async function create(url,options){
  const response = await fetch(url, options)
  .then(res => res.json())
  .then(function(json){
    id = json.campaign_id
    console.log(json,":",id)
    exporter()
    return json
  
  })
  
  .catch(err => console.error('error:' + err));

  


}

async function exporter(){
  const url1 = `https://personalized-brand.api.rephrase.ai/v2/campaign/${id}/export`
  
  const headers1 = {
    "accept": "application/json",
    "Authorization": bearerToken,
  }

  const options1 = {
    method: 'POST',
    headers : headers1,
    
  }
  const response1 = await fetch(url1,options1)
    .then(res => res.json())
    .then(function(json){
      console.log(json)
      getUrl()
    })
    .catch(err => console.error('error:' + err));
  
}



async function getUrl(){
  const url2 = `https://personalized-brand.api.rephrase.ai/v2/campaign/${id}`
  const headers2 = {
    "accept": "application/json",
    "Authorization": bearerToken,
  }
  const options2 = {
    method: 'GET',
    headers : headers2,
    
  }
  
  
 function getVideo(){
    const response2 = fetch(url2,options2)
    .then(res => res.json())
    .then(function(json){
      console.log(json)
  
    })
    .catch(err => console.error('error:' + err));
  }
  Promise.all([getVideo()])


}



export default handler;

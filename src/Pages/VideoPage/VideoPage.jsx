import React, { useEffect } from 'react'
import './VideoPage.css'
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns';
import Comments from '../../Components/Comments/Comments';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addToHistroy } from '../../actions/Histroy';
import { viewVideo } from '../../actions/video';


function VideoPage() {
  const {vid}=useParams();
  //console.log(vid)
  //const chanels = useSelector(state => state?.chanelReducers);
  //currentChanel = chanels.filter(c => c._id === vid)[0];

  const vids=useSelector((state)=>state.videoReducer);
  const vv=vids?.data.filter((q)=> q._id===vid)[0];
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  const handleHistroy=()=>{
    dispatch(
      addToHistroy(
        {
          videoId: vid,
          Viewer: CurrentUser?.result._id,
        }
      )
    );
  };

  const handleViews=()=>{
    dispatch(viewVideo({
      id:vid
    }))
  }
  useEffect(()=>{
    if(CurrentUser){
    handleHistroy();
    }
    handleViews();
  },[]);

  return (
    <>
    <div className='container_videoPage'>
        <div className='container2_videoPage'>
            <div className='video_display_screen_videoPage'>
                <video 
                src={`http://localhost:5500/${vv.filePath}`}
                className={'video_ShowVideo_videoPage'}
                controls
                autoPlay
                ></video>
                <div className='video_details_videoPage'>
                  <div className='video_btns_title_VideoPage'>
                    <p className='video_title_VideoPage'>{vv?.videoTitle}</p>
                    <div className='views_date_btns_VideoPage'>
                      <div className='views_videoPage'>
                      {vv?.Views} views <div className='dot'></div> {moment(vv?.createdAt).fromNow()}
                    </div>
                    </div>
                    <LikeWatchLaterSaveBtns vv={vv} vid={vid}/>
                  </div>
                  <Link to={`/chanel/${vv?.videoChanel}`} className='Chanel_details_videoPage'>
                    <b className='chanel_logo_videoPage'>
                      <p>{vv?.Uploader.charAt(0).toUpperCase()}</p>
                    </b>
                    <p className='chanel_name_videoPage'>{vv?.Uploader}</p>
                  </Link>
                  <div className='comments_videoPage'>
                    <h2>
                      <u>
                        comments
                      </u>
                    </h2>
                    <Comments videoId={vv._id}/>
                  </div>
                </div>
            </div>
            <div className='moreVideoBar'>
              More video
            </div>
        </div>     
    </div>
    </>
  );
}

export default VideoPage
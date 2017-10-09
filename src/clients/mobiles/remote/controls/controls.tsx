import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";
import {secondstoHHMMSS} from "../../utils/date";
const PlayBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/play.svg')
const BackwardBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/backward.svg')
const PauseBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/pause.svg')
const ForwardBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/forward.svg')
const MaximizeBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/maximize.svg')
const MinimizeBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/minimize.svg')
const StarBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/star.svg')
const StarFilledBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!./svg/star-filled.svg')

const styles = require('./controls.css')

export interface ControlsPops {
    controller: Controller
    play: () => void
    pause: () => void
    seekBackward: (number: number) => void
    seekForward: (number: number) => void
    volumeUp: (number: number) => void
    volumeDown: (number: number) => void
    enterFullScreen: () => void
    exitFullScreen: () => void
    title: string
    duration: number
    currentTime: number
    currentTimeAsPercentage: string
    dominantBackgroundColor: string
    volume: number
}
export const Controls = (props: ControlsPops) => {
    setTimeout(() => {
        document.getElementById('bottomControls').scrollIntoView();
    }, 0);
    return (
        <div className={classnames(styles.container, styles.white)}>
            <div className={styles.timeSlider}>
                <input type="range" min="1" max="100" defaultValue="33" className={styles.slider} />
                <div className={styles.sliderInfos}>
                    <span>{secondstoHHMMSS(props.currentTime)}</span>
                    <span>{secondstoHHMMSS(props.duration)}</span>
                </div>
            </div>
            <div className={styles.title}>
                <span>{props.title}</span>
            </div>
            
            <div className={styles.controls}>

                <button className={classnames(styles.button)} onClick={() => props.seekBackward(5)}>
                    <BackwardBtnSvg style={{
                        fill: props.dominantBackgroundColor
                    }}/>
                </button>
                {
                    props.controller.isPlaying ?
                        <button className={classnames(styles.button)} onClick={() => props.pause()}>
                            <PauseBtnSvg  style={{
                                fill: props.dominantBackgroundColor
                            }}/>
                        </button>
                        :
                        <button className={classnames(styles.button)} onClick={() => props.play()}>
                            <PlayBtnSvg  style={{
                                fill: props.dominantBackgroundColor
                            }}/>
                        </button>
                }

                <button className={classnames(styles.button)} onClick={() => props.seekForward(5)}>
                    <ForwardBtnSvg  style={{
                        fill: props.dominantBackgroundColor
                    }}/>
                </button>
            </div>
            <div className={styles.volumeSlider}>
                <div className={styles.mute}></div>
                <div className={styles.sliderContainer}>
                    <input type="range" min="1" max="100" defaultValue="22" style={{
                        background: props.dominantBackgroundColor
                    }}className={styles.slider} />
                </div>
                <div className={styles.volumeUp}></div>
            </div>
            <div className={styles.bottomControls} id="bottomControls">
                {
                    !props.controller.isFullScreen ?
                        <button className={classnames(styles.button, styles.ripple)} onClick={() => props.exitFullScreen()}>
                            <StarBtnSvg className={styles.starsSvgs} style={{
                                fill: props.dominantBackgroundColor
                            }}/>
                        </button>
                        :
                        <button className={classnames(styles.button, styles.ripple)} onClick={() => props.enterFullScreen()}>
                            <StarFilledBtnSvg className={styles.starsSvgs}/>
                        </button>
                }
                {
                    props.controller.isFullScreen ?
                        <button className={classnames(styles.button, styles.ripple)} onClick={() => props.exitFullScreen()}>
                            <MinimizeBtnSvg  style={{
                                fill: props.dominantBackgroundColor
                            }}/>
                        </button>
                        :
                        <button className={classnames(styles.button, styles.ripple)} onClick={() => props.enterFullScreen()}>
                            <MaximizeBtnSvg  style={{
                                fill: props.dominantBackgroundColor
                            }}/>
                        </button>
                }
            </div>
        </div>
    )
}

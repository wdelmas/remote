import * as React from "react";
import * as classnames from 'classnames'
import { Controller } from "../../store/videoPlayer/index";

const MuteBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/mute.svg')
const VolumeUpBtnSvg = require('!babel-loader!svg-react-loader!image-webpack-loader?bypassOnDebug!../svg/volume-up.svg')

const styles = require('./volume.css')

export interface VolumePops {
    onVolumeChange: (number: number) => void
    volume: number
    dominantBackgroundColor: string
}
// export const Volume = (props: VolumePops) => {
export class Volume extends React.Component<VolumePops, {}>  {
    public refs: {
        volume: HTMLInputElement
        [k: string]: React.ReactInstance
    }

    public _onVolumeChanged = () => {
        const value = parseInt(this.refs.volume.value)/100
        console.log(value)
        if (this.props.onVolumeChange)
            this.props.onVolumeChange(value)
    }

    public render() {
        const volume = this.props.volume * 100
        return (<div className={styles.volumeSlider}>
            <MuteBtnSvg className={styles.volumeSvgs} style={{
                fill: this.props.dominantBackgroundColor
            }} />
            <div className={styles.sliderContainer}>
                <input ref="volume" type="range" min="1" max="100" value={volume} onChange={() => this._onVolumeChanged()} style={{
                    background: this.props.dominantBackgroundColor
                }} className={styles.slider} />
            </div>
            <VolumeUpBtnSvg className={styles.volumeSvgs} style={{
                fill: this.props.dominantBackgroundColor
            }} />
        </div>
        )
    }
}

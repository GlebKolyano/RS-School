/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import { FilterByRangePayload } from '../../../models/models';
import './style.css';

type SliderProps = {
  minVl: number;
  maxVl: number;
  onChange: (value: FilterByRangePayload) => void;
};

function Slider(props: SliderProps) {
  const { minVl, maxVl, onChange } = props;
  const [min, setMin] = useState(minVl);
  const [max, setMax] = useState(maxVl);

  const handleChangeMaxMin = (minVal: number, maxVal: number) => {
    setMin(minVal);
    setMax(maxVal);
  };

  const handleUpdateState = () => {
    const res = { min, max };
    onChange(res);
  };

  return (
    <div className="conatainer">
      <ReactSlider
        defaultValue={[min, max]}
        className="slider"
        trackClassName="tracker"
        min={minVl}
        max={maxVl}
        minDistance={0}
        step={1}
        pearling
        withTracks
        renderThumb={(thumbProps) => {
          return <div {...thumbProps} className="thumb" />;
        }}
        renderTrack={(trackProps) => {
          return <div {...trackProps} className="track" />;
        }}
        onChange={([minVal, maxVal]) => handleChangeMaxMin(minVal, maxVal)}
        onAfterChange={() => handleUpdateState()}
      />
      <div className="values-wrapper">
        <p>
          Min:
          <span>{min}</span>
        </p>
        <p>
          Max:
          <span>{max}</span>
        </p>
      </div>
    </div>
  );
}

export default Slider;

import React, { useState, useRef } from 'react';
import useIsMobile from './useIsMobile';
import { IoCall, IoClose } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaSearchLocation } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = [];
  const totalStars = 5;
  for (let i = 0; i < totalStars; i++) {
    if (rating >= i + 1) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (rating > i) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaStar key={i} className="text-gray-300" />);
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};

function PlaceList({ places, onSelectPlaceInList }) {
  if (places.length === 0) {
    return <p className="text-sm text-gray-500 p-2">ยังไม่มีข้อมูล</p>;
  }
  return (
    <div className="p-2 space-y-2">
      {places.map((place, i) => (
        <div
          key={place.place_id || i}
          onClick={() => onSelectPlaceInList(place)}
          className="bg-white p-3 rounded shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100"
        >
          <h3 className="text-sm font-medium text-green-800">{place.name}</h3>
          {place.vicinity && (
            <p className="text-xs text-gray-600 mt-1">{place.vicinity}</p>
          )}
          {place.rating && (
            <div className="flex items-center mt-1">
              <StarRating rating={Number(place.rating)} />
              <span className="text-xs text-yellow-600 ml-1">({place.rating})</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DetailedInfo({ place, onBackToList }) {
  const [showHours, setShowHours] = useState(false);

  const toggleHours = () => setShowHours((prev) => !prev);

  return (
    <div className="p-3 overflow-auto h-full">
      <button
        onClick={onBackToList}
        className="mb-3 text-green-600 text-sm hover:underline font-semibold"
      >
        &larr; Back to List
      </button>
      <h3 className="text-lg font-semibold text-green-700 mb-2">
        {place.name}
      </h3>
      {place.formatted_address && (
        <p className="text-sm text-gray-700 mb-1 flex items-center">
          <span className="font-semibold text-gray-600 mr-2 flex items-center gap-1">
            <FaSearchLocation className="text-base" />:
          </span>
          {place.formatted_address}
        </p>
      )}
      {place.formatted_phone_number && (
        <p className="text-sm text-gray-700 mb-1 flex items-center">
          <span className="font-semibold text-gray-600 mr-2 flex items-center gap-1">
            <IoCall className="text-base" />
            Call:
          </span>
          {place.formatted_phone_number}
        </p>
      )}
      {place.rating && (
        <p className="text-yellow-600 mb-2 flex items-center">
          <span className="font-semibold text-gray-600 mr-2">Rating:</span>
          <StarRating rating={Number(place.rating)} />
          <span className="ml-2 text-sm">({place.rating})</span>
        </p>
      )}
      {place.opening_hours && (
        <div className="mb-3">
          <button
            onClick={toggleHours}
            className="text-green-600 hover:underline font-medium flex items-center mb-1"
          >
            <span className="mr-1"><MdAccessTime /></span>
            {showHours ? 'Hide opening time' : 'See opening time'}
          </button>
          {showHours && place.opening_hours.weekday_text && (
            <div className="mt-1 ml-6 text-gray-600 text-sm space-y-1">
              {place.opening_hours.weekday_text.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}
        </div>
      )}
      <hr className="my-3 border-gray-600" />
      <p className="font-semibold text-green-700 mb-2">Images:</p>
      {(!place.photos || place.photos.length === 0) && (
        <p className="text-gray-500 text-sm">No images</p>
      )}
      {place.photos?.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {place.photos.map((photo, idx) => {
            const url = photo.getUrl({ maxWidth: 300, maxHeight: 200 });
            return (
              <img
                key={idx}
                src={url}
                alt={place.name}
                className="w-full h-32 object-cover rounded shadow"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SidePanel({
  isOpen,
  onClose,
  places,
  detailedPlace,
  onSelectPlaceInList,
  onShowAllMarkers,
  onBackToList
}) {
  const isMobile = useIsMobile(768);

  // ----- Drag Resize Logic -----
  const [panelWidth, setPanelWidth] = useState(
    isMobile ? window.innerWidth * 0.7 : 384
  );
  const isResizing = useRef(false);

  const handleTouchStart = (e) => {
    if (!isMobile) return;
    e.preventDefault();
    isResizing.current = true;
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    if (!isResizing.current) return;
    const touch = e.touches[0];
    let newWidth = touch.clientX;
    if (newWidth < 200) newWidth = 200;
    if (newWidth > 600) newWidth = 600;
    setPanelWidth(newWidth);
  };

  const handleTouchEnd = () => {
    isResizing.current = false;
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  // ----- Collapse Logic (ย่อ/ขยาย) -----
  const [collapsed, setCollapsed] = useState(false);
  const collapsedWidth = 30; // px

  let transformStyle = 'translateX(-100%)';
  if (isOpen) {
    transformStyle = collapsed
      ? `translateX(-${panelWidth - collapsedWidth}px)`
      : 'translateX(0)';
  }

  return (
    <div
      className="
        absolute top-0 left-0 h-full
        bg-green-50 shadow-2xl border-r border-green-200 z-30
        transition-transform duration-300 ease-in-out
      "
      style={{
        width: isMobile ? panelWidth : 384,
        transform: transformStyle
      }}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 bg-green-100 border-b border-green-200">
        <h2 className="font-bold text-green-800 text-base">Results</h2>
        <button
          onClick={onClose}
          className="text-green-700 hover:text-red-600 text-sm"
        >
          <IoClose />
        </button>
      </div>

      {/* container: out overflow-visible, in overflow-y-auto */}
      <div className="relative overflow-visible h-[calc(100%-4rem)]">
        {/* inside => scroll only content */}
        <div className="h-full overflow-y-auto">
          {detailedPlace ? (
            <DetailedInfo place={detailedPlace} onBackToList={onBackToList} />
          ) : (
            <>
              <div className="p-3 border-b border-green-100">
                <button
                  onClick={onShowAllMarkers}
                  className="text-green-600 text-sm hover:underline font-medium"
                >
                  Show All Markers
                </button>
              </div>
              <PlaceList
                places={places}
                onSelectPlaceInList={onSelectPlaceInList}
              />
            </>
          )}
        </div>

        {/* Handle Drag (Mobile) */}
        {isMobile && (
          <div
            className="
              absolute top-0 right-0
              h-full w-2
              bg-gray-200
              cursor-col-resize
              hover:bg-gray-300
              z-50
            "
            onTouchStart={handleTouchStart}
          />
        )}

        {/* >< */}
        {isMobile && isOpen && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              absolute top-1/2
              transform -translate-y-1/2
              bg-green-300 w-8 h-8
              flex items-center justify-center
              rounded-full shadow
              z-50
              right-[-16px]
            "
          >
            {collapsed ? '>' : '<'}
          </button>
        )}
      </div>
    </div>
  );
}

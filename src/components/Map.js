import React, { useEffect } from 'react';

function Map() {
  useEffect(() => {
    var map;
    var search;

    function init() {
      map = new window.longdo.Map({
        placeholder: document.getElementById('map')
      });
      search = document.getElementById('search');
      map.Search.placeholder(
        document.getElementById('result')
      );

      search.onkeyup = function(event) {
        if ((event || window.event).keyCode !== 13)
          return;
        doSearch();
      };
    }

    function doSearch() {
      map.Search.search(search.value, {
        area: 10
      });
    }

    init();
  }, []);

  return (
    <div className="map-page">
      <div id="map" className="map-container"></div>
      <input id="search" type="text" placeholder="Search for a place..." className="map-search-box" />
      <div id="result"></div>
    </div>
  );
}

export default Map; 
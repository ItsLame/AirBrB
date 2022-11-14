import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  MdLocalLaundryService,
  MdIron,
  MdDryCleaning,
  MdAir,
  MdOutlineDesktopMac,
  MdOutlineBreakfastDining,
  MdElectricalServices,
  MdPool,
  MdOutdoorGrill,
  MdFireplace,
  MdFaceRetouchingNatural,
} from 'react-icons/md';
import { HiWifi } from 'react-icons/hi';
import { RiTvFill } from 'react-icons/ri';
import {
  FaHotjar,
  FaSmoking,
  FaHotTub,
  FaParking,
  FaBabyCarriage,
  FaWater,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { CgGym } from 'react-icons/cg';
import { ImFire } from 'react-icons/im';
import { BsAlarm } from 'react-icons/bs';

const AmenityList = ({ amenities }) => {
  AmenityList.propTypes = {
    amenities: PropTypes.array,
  };

  // map of amenity to icon
  const amenityIconMap = {
    'Washing machine': <MdLocalLaundryService />,
    'Wi-Fi': <HiWifi />,
    Iron: <MdIron />,
    TV: <RiTvFill />,
    Heating: <FaHotjar />,
    Dryer: <MdDryCleaning />,
    Kitchen: <TbToolsKitchen2 />,
    'Air conditioning': <MdAir />,
    'Dedicated workspace': <MdOutlineDesktopMac />,
    'Hair dryer': <MdFaceRetouchingNatural />,
    'Smoking allowed': <FaSmoking />,
    Breakfast: <MdOutlineBreakfastDining />,
    Gym: <CgGym />,
    'EV charger': <MdElectricalServices />,
    'Hot tub': <FaHotTub />,
    Pool: <MdPool />,
    'Free parking on premises': <FaParking />,
    Cot: <FaBabyCarriage />,
    'BBQ grill': <MdOutdoorGrill />,
    'Indoor fireplace': <MdFireplace />,
    Waterfront: <FaWater />,
    Beachfront: <FaUmbrellaBeach />,
    'Smoke alarm': <ImFire />,
    'Carbon monoxide alarm': <BsAlarm />,
  };

  return (
    <Row xs={1} sm={1} md={2} className="mb-3">
      <Col>
        {amenities.slice(0, Math.ceil(amenities.length / 2)).map((amenity) => (
          <div
            key={amenity}
            className="d-flex gap-2 align-items-center flex-nowrap"
          >
            {amenityIconMap[amenity]} {amenity}
          </div>
        ))}
      </Col>
      <Col>
        {amenities.slice(Math.ceil(amenities.length / 2)).map((amenity) => (
          <div
            key={amenity}
            className="d-flex gap-2 align-items-center flex-nowrap"
          >
            {amenityIconMap[amenity]} {amenity}
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default AmenityList;

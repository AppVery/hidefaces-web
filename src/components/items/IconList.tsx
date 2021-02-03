import React from 'react';
import deleteIcon from '../../svg/delete.svg';
import robotIcon from '../../svg/robot.svg';
import monkeyIcon from '../../svg/monkey.svg';
import pushIcon from '../../svg/push.svg';

const data: { icon: string; text: string }[] = [
  { icon: pushIcon, text: 'Easy to use solution' },
  { icon: robotIcon, text: 'Faster than human labor' },
  { icon: monkeyIcon, text: 'Work without login' },
  { icon: deleteIcon, text: 'The video is not saved' },
];

const Item: React.FC<{ icon: string; text: string }> = ({ icon, text }) => {
  return (
    <div className="md:ml-10">
      <li className="mt-6 lg:mt-0">
        <div className="flex items-center">
          <span className="flex-shrink-0 flex items-center justify-center h-15 w-15 rounded-full bg-indigo-800">
            <img className="h-12 w-12" src={icon} alt="Delete Image" />
          </span>
          <span className="ml-4 text-base leading-6 font-medium text-gray-500">{text}</span>
        </div>
      </li>
    </div>
  );
};

const IconList: React.FC = () => {
  return (
    <ul className="mt-8 md:grid md:grid-cols-2 gap-6">
      {data.map(({ icon, text }, i) => (
        <Item key={i} icon={icon} text={text} />
      ))}
    </ul>
  );
};

export default IconList;

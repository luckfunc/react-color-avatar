import React from 'react';
import './style.less';

interface IProps {
  title?: string;
  children: React.ReactNode;
}

export default function SectionWrapper(props: IProps) {
  const { title, children } = props;
  return (
    <div className="setting-section">
      <div className="section-title">{ title }</div>
      <div>
        { children }
      </div>
    </div>
  );
}

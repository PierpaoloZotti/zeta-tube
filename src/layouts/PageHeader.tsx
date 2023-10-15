import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from 'lucide-react';
import logo from '../assets/zetatube.svg';
import { Button } from '../components/Button';
import { useState } from 'react';
import { useSidebarContext } from '../context/SidebarContext';

export default function PageHeader() {
  const [showFullWidthSeearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className='flex gap-10 lg:gap-20 justify-between pt-2 mb-6 px-4'>
      <PageHeaderFirstSection hidden={showFullWidthSeearch} />
      <form
        className={` gap-4 flex-grow justify-center ${
          showFullWidthSeearch ? 'flex' : 'hidden md:flex'
        }`}
      >
        {showFullWidthSeearch && (
          <Button
            variant='ghost'
            size='icon'
            className='flex flex-shrink-0'
            onClick={() => setShowFullWidthSearch(false)}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className='flex flex-grow max-w-[600px]'>
          <input
            type='search'
            placeholder='Search'
            className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none'
          />
          <Button
            variant='default'
            className='py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0'
          >
            <Search />
          </Button>
        </div>
        <Button
          size='icon'
          className='flex-shrink-0'
        >
          <Mic />
        </Button>
      </form>
      <div
        className={` flex-shrink-0 md:gap-2 items-center ${
          showFullWidthSeearch ? 'hidden' : 'flex'
        }`}
      >
        <Button
          size='icon'
          variant='ghost'
          className='md:hidden'
          onClick={() => setShowFullWidthSearch(true)}
        >
          <Search />
        </Button>
        <Button
          size='icon'
          variant='ghost'
          className='md:hidden'
        >
          <Mic />
        </Button>
        <Button
          size='icon'
          variant='ghost'
        >
          <Upload />
        </Button>
        <Button
          size='icon'
          variant='ghost'
        >
          <Bell />
        </Button>
        <Button
          size='icon'
          variant='ghost'
        >
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={` gap-4 items-center flex-shrink-0 ${
        hidden ? 'hidden' : 'flex'
      }`}
    >
      <Button
        onClick={toggle}
        variant='ghost'
        size='icon'
      >
        <Menu />
      </Button>
      <a href='/'>
        <img
          src={logo}
          alt='logo'
          className='h-6'
        />
      </a>
    </div>
  );
}

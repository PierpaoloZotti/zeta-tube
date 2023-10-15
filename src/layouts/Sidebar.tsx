import { twMerge } from 'tailwind-merge';
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Gamepad,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Newspaper,
  PlaySquare,
  RadioTower,
  Repeat,
  Search,
  Shirt,
} from 'lucide-react';
import { Button, buttonStyles } from '../components/Button';
import { Children, ElementType, useState } from 'react';
import { playlists, subscriptions } from '../data/sidebar';
import { useSidebarContext } from '../context/SidebarContext';

export default function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 
        ${isLargeOpen ? 'lg:hidden' : 'lg:flex'}`}
      >
        <SmallSidebarItem
          Icon={Home}
          title='Home'
          url='/'
        />
        <SmallSidebarItem
          Icon={Repeat}
          title='Shorts'
          url='/shorts'
        />
        <SmallSidebarItem
          Icon={Clapperboard}
          title='Subscriptions'
          url='/subscriptions'
        />
        <SmallSidebarItem
          Icon={Library}
          title='Library'
          url='/library'
        />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className='lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50'
        ></div>
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2  ${
          isSmallOpen ? 'flex z-[999] max-h-screen bg-white' : 'hidden '
        }
        ${isLargeOpen ? 'lg:flex' : 'lg:hidden'}
        `}
      >
        <LargeSidebarSection visibleItemCount={1}>
          <LargeSidebarItem
            IconOrUrl={Home}
            title='Home'
            url='/'
          />
          <LargeSidebarItem
            IconOrUrl={Clapperboard}
            title='Subscriptions'
            url='/subscriptions'
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrUrl={Library}
            title='Library'
            url='/library'
          />
          <LargeSidebarItem
            IconOrUrl={History}
            title='History'
            url='/history'
          />
          <LargeSidebarItem
            IconOrUrl={PlaySquare}
            title='Your Videos'
            url='/your-videos'
          />
          <LargeSidebarItem
            IconOrUrl={Clock}
            title='Watch Later'
            url='/playlist?list=WL'
          />
          {playlists.map((playlist) => {
            return (
              <LargeSidebarItem
                key={playlist.id}
                IconOrUrl={ListVideo}
                title={playlist.name}
                url={`/playlist?list=${playlist.id}`}
              />
            );
          })}
        </LargeSidebarSection>
        <LargeSidebarSection
          title='Subscriptions'
          visibleItemCount={3}
        >
          {subscriptions.map((subscription) => {
            return (
              <LargeSidebarItem
                key={subscription.id}
                IconOrUrl={subscription.imgUrl}
                title={subscription.channelName}
                url={`/@${subscription.id}`}
              />
            );
          })}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title='Explore'>
          <LargeSidebarItem
            IconOrUrl={Gamepad}
            title='Gaming'
            url='/gaming'
          />
          <LargeSidebarItem
            IconOrUrl={Newspaper}
            title='News'
            url='/news'
          />
          <LargeSidebarItem
            IconOrUrl={RadioTower}
            title='Live'
            url='/live'
          />
          <LargeSidebarItem
            IconOrUrl={Shirt}
            title='Fashion & Beauty'
            url='/fashion-and-beauty'
          />
          <LargeSidebarItem
            IconOrUrl={Lightbulb}
            title='Learning'
            url='/learning'
          />

          <LargeSidebarItem
            IconOrUrl={Search}
            title='Browse channels'
            url='/channels'
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        'py-4 px-1 flex flex-col items-center rounded-lg gap-1',
      )}
    >
      <Icon className='w-6 h-6' />
      <div className='text-sm'>{title}</div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className='ml-4 mt-2 text-lg mb-1'>{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant='ghost'
          className='w-full flex items-center rounded-lg gap-4 p-3'
        >
          <ButtonIcon className='w-6 h-6' />
          <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
            {isExpanded ? 'Show less' : 'Show more'}
          </div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  isActive?: boolean;
  IconOrUrl: ElementType | string;
  title: string;
  url: string;
};

function LargeSidebarItem({
  isActive = false,
  IconOrUrl,
  title,
  url,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: 'ghost' }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive
            ? 'font-semibold bg-neutral-100 hover:bg-secondary'
            : undefined
        }`,
      )}
    >
      {typeof IconOrUrl === 'string' ? (
        <img
          src={IconOrUrl}
          className='w-6 h-6 rounded-full'
        />
      ) : (
        <IconOrUrl className='w-6 h-6' />
      )}
      <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
        {title}
      </div>
    </a>
  );
}

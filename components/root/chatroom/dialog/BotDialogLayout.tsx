import BotIcon from './BotIcon';

export default function BotDialogLayout({ className, children }: LayoutProps) {
  return (
    <div className='w-full flex items-end'>
      <BotIcon />
      <div
        className={`${className} flex flex-col rounded-2xl rounded-bl-none bg-gray-50 text-gray-900 text-sm overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}

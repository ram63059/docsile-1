import React, { useState } from 'react';
import { Search, Link as LinkIcon, X } from 'lucide-react';

interface Connection {
  id: string;
  name: string;
  title: string;
  avatar: string;
  selected: boolean;
}

interface SharePopUpProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  onShare: (selectedConnections: string[]) => void;
}

// Sample connections data
const sampleConnections: Connection[] = [
  {
    id: '1',
    name: 'Vamshidhar seelam',
    title: 'Ophthalmologist | AIIMS Delhi-25 | Aspiring Medical Professional',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    selected: false
  },
  {
    id: '2',
    name: 'John Smith',
    title: 'Software Engineer | Tech Lead',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    selected: false
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    title: 'Product Manager | MBA',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    selected: false
  },
  {
    id: '4',
    name: 'Michael Chen',
    title: 'Data Scientist | PhD',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    selected: false
  },
  {
    id: '5',
    name: 'Emily Brown',
    title: 'UX Designer | Creative Director',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    selected: false
  }
];

const SharePopUp: React.FC<SharePopUpProps> = ({
  isOpen,
  onClose,
  postId,
  onShare,
}) => {
  const [connections, setConnections] = useState<Connection[]>(sampleConnections);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSharingInProgress, setIsSharingInProgress] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleConnectionSelection = (connectionId: string) => {
    setConnections(connections.map(conn => 
      conn.id === connectionId ? { ...conn, selected: !conn.selected } : conn
    ));
  };

  const filteredConnections = connections.filter(conn =>
    conn.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = () => {
    const selectedConnectionIds = connections
      .filter(conn => conn.selected)
      .map(conn => conn.id);

    if (selectedConnectionIds.length === 0) return;

    setIsSharingInProgress(true);
    try {
      onShare(selectedConnectionIds);
      onClose();
    } catch (error) {
      console.error('Error sharing post:', error);
    } finally {
      setIsSharingInProgress(false);
    }
  };

  const copyLinkToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/posts/${postId}`);
      // You could add a toast notification here
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-maincl">Share Post</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-1 bg-gray-100 border border-gray-300 rounded-3xl focus:outline-none focus:ring-1 focus:ring-fillc"
          />
        </div>

        <div className="max-h-[80%] overflow-y-auto mb-4">
          {filteredConnections.map(connection => (
            <div
              key={connection.id}
              className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => toggleConnectionSelection(connection.id)}
            >
              <div className="flex-shrink-0">
                <img
                  src={connection.avatar}
                  alt={connection.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="ml-3 flex-grow">
                <p className="font-medium text-sm">{connection.name}</p>
                <p className="text-xs text-gray-500">{connection.title}</p>
              </div>
              <input
                type="checkbox"
                checked={connection.selected}
                onChange={() => {}}
                className="w-4 h-4 text-maincl rounded  border-gray-300 focus:ring-maincl"

              />
            </div>
          ))}
        </div>

        

        <div className="flex justify-between pt-4 gap-2">
        <div className="flex items-center justify-start gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
          <button className="flex items-center"  onClick={copyLinkToClipboard} >
            <LinkIcon className="w-5 h-5 text-gray-500" />
            <span className="ml-2 text-sm">Copy link</span>
          </button>
          
        </div>

        <div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-3xl border border-gray-100"
            >
            Cancel
          </button>
          <button
            onClick={handleShare}
            disabled={!connections.some(conn => conn.selected) || isSharingInProgress}
            className={`px-4 py-2 text-sm font-medium text-white rounded-3xl ${
                connections.some(conn => conn.selected) && !isSharingInProgress
                ? 'bg-maincl hover:bg-fillc'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
            >
            {isSharingInProgress ? 'Sharing...' : 'Share'}
          </button>
              </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopUp;
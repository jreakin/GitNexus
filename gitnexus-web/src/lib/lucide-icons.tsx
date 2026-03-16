/**
 * Direct icon imports from lucide-react (bundle-size optimization).
 * Avoids loading the full barrel (~1500+ modules). Each icon loads only its own module.
 * See Vercel React Best Practices rule 2.1 (Avoid Barrel File Imports).
 */
// @ts-nocheck — icon .js modules have no types; re-exports are typed at use sites
// Direct ESM paths so only these icon modules are bundled, not the full barrel
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle.js';
import AlertTriangle from 'lucide-react/dist/esm/icons/alert-triangle.js';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js';
import Brain from 'lucide-react/dist/esm/icons/brain.js';
import Box from 'lucide-react/dist/esm/icons/box.js';
import Braces from 'lucide-react/dist/esm/icons/braces.js';
import Check from 'lucide-react/dist/esm/icons/check.js';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down.js';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.js';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up.js';
import Code from 'lucide-react/dist/esm/icons/code.js';
import Copy from 'lucide-react/dist/esm/icons/copy.js';
import Eye from 'lucide-react/dist/esm/icons/eye.js';
import EyeOff from 'lucide-react/dist/esm/icons/eye-off.js';
import FileArchive from 'lucide-react/dist/esm/icons/file-archive.js';
import FileCode from 'lucide-react/dist/esm/icons/file-code.js';
import Filter from 'lucide-react/dist/esm/icons/filter.js';
import FlaskConical from 'lucide-react/dist/esm/icons/flask-conical.js';
import Focus from 'lucide-react/dist/esm/icons/focus.js';
import Folder from 'lucide-react/dist/esm/icons/folder.js';
import FolderOpen from 'lucide-react/dist/esm/icons/folder-open.js';
import GitBranch from 'lucide-react/dist/esm/icons/git-branch.js';
import Github from 'lucide-react/dist/esm/icons/github.js';
import Globe from 'lucide-react/dist/esm/icons/globe.js';
import Hash from 'lucide-react/dist/esm/icons/hash.js';
import Heart from 'lucide-react/dist/esm/icons/heart.js';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle.js';
import Home from 'lucide-react/dist/esm/icons/home.js';
import Key from 'lucide-react/dist/esm/icons/key.js';
import Layers from 'lucide-react/dist/esm/icons/layers.js';
import Lightbulb from 'lucide-react/dist/esm/icons/lightbulb.js';
import LightbulbOff from 'lucide-react/dist/esm/icons/lightbulb-off.js';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2.js';
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2.js';
import MousePointerClick from 'lucide-react/dist/esm/icons/mouse-pointer-click.js';
import PanelLeft from 'lucide-react/dist/esm/icons/panel-left.js';
import PanelLeftClose from 'lucide-react/dist/esm/icons/panel-left-close.js';
import PanelRightClose from 'lucide-react/dist/esm/icons/panel-right-close.js';
import Pause from 'lucide-react/dist/esm/icons/pause.js';
import Play from 'lucide-react/dist/esm/icons/play.js';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw.js';
import Rocket from 'lucide-react/dist/esm/icons/rocket.js';
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw.js';
import Search from 'lucide-react/dist/esm/icons/search.js';
import Send from 'lucide-react/dist/esm/icons/send.js';
import Server from 'lucide-react/dist/esm/icons/server.js';
import Settings from 'lucide-react/dist/esm/icons/settings.js';
import SkipForward from 'lucide-react/dist/esm/icons/skip-forward.js';
import Snail from 'lucide-react/dist/esm/icons/snail.js';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.js';
import Square from 'lucide-react/dist/esm/icons/square.js';
import Star from 'lucide-react/dist/esm/icons/star.js';
import Table from 'lucide-react/dist/esm/icons/table.js';
import Target from 'lucide-react/dist/esm/icons/target.js';
import Terminal from 'lucide-react/dist/esm/icons/terminal.js';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2.js';
import Upload from 'lucide-react/dist/esm/icons/upload.js';
import User from 'lucide-react/dist/esm/icons/user.js';
import Variable from 'lucide-react/dist/esm/icons/variable.js';
import X from 'lucide-react/dist/esm/icons/x.js';
import Zap from 'lucide-react/dist/esm/icons/zap.js';
import ZoomIn from 'lucide-react/dist/esm/icons/zoom-in.js';
import ZoomOut from 'lucide-react/dist/esm/icons/zoom-out.js';

export {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Brain,
  Box,
  Braces,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Code,
  Copy,
  Eye,
  EyeOff,
  FileArchive,
  FileCode,
  Filter,
  FlaskConical,
  Focus,
  Folder,
  FolderOpen,
  GitBranch,
  Github,
  Globe,
  Hash,
  Heart,
  HelpCircle,
  Home,
  Key,
  Layers,
  Lightbulb,
  LightbulbOff,
  Loader2,
  Maximize2,
  MousePointerClick,
  PanelLeft,
  PanelLeftClose,
  PanelRightClose,
  Pause,
  Play,
  RefreshCw,
  Rocket,
  RotateCcw,
  Search,
  Send,
  Server,
  Settings,
  SkipForward,
  Snail,
  Sparkles,
  Square,
  Star,
  Table,
  Target,
  Terminal,
  Trash2,
  Upload,
  User,
  Variable,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
};

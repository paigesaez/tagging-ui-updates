import { useState, useRef } from 'react'
import { Upload, X, FileAudio, FileText, Plus, FolderOpen } from 'lucide-react'

interface FormData {
  location: string
  meetingDate: string
  meetingBody: string
  meetingType: string
}

interface UploadEntry {
  id: string
  formData: FormData
  audioFile: File | null
  agendaFile: File | null
}

export default function FileUploader() {
  const [entries, setEntries] = useState<UploadEntry[]>([])
  const [currentForm, setCurrentForm] = useState<FormData>({
    location: '',
    meetingDate: '',
    meetingBody: '',
    meetingType: ''
  })
  
  const [currentAudioFile, setCurrentAudioFile] = useState<File | null>(null)
  const [currentAgendaFile, setCurrentAgendaFile] = useState<File | null>(null)
  
  const [audioDragActive, setAudioDragActive] = useState(false)
  const [agendaDragActive, setAgendaDragActive] = useState(false)
  
  const audioInputRef = useRef<HTMLInputElement>(null)
  const agendaInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent, type: 'audio' | 'agenda') => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      if (type === 'audio') setAudioDragActive(true)
      else setAgendaDragActive(true)
    } else if (e.type === 'dragleave') {
      if (type === 'audio') setAudioDragActive(false)
      else setAgendaDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent, type: 'audio' | 'agenda') => {
    e.preventDefault()
    e.stopPropagation()
    if (type === 'audio') setAudioDragActive(false)
    else setAgendaDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (type === 'audio') {
        setCurrentAudioFile(file)
      } else {
        setCurrentAgendaFile(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'agenda') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (type === 'audio') {
        setCurrentAudioFile(file)
      } else {
        setCurrentAgendaFile(file)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentForm(prev => ({ ...prev, [name]: value }))
  }

  const addEntry = () => {
    if (!currentForm.location || !currentForm.meetingDate || 
        !currentForm.meetingBody || !currentForm.meetingType || !currentAudioFile) {
      alert('Please fill in all required fields and upload an audio file')
      return
    }

    const newEntry: UploadEntry = {
      id: Math.random().toString(36).substring(7),
      formData: { ...currentForm },
      audioFile: currentAudioFile,
      agendaFile: currentAgendaFile
    }

    setEntries(prev => [...prev, newEntry])
    
    // Reset form
    setCurrentForm({
      location: '',
      meetingDate: '',
      meetingBody: '',
      meetingType: ''
    })
    setCurrentAudioFile(null)
    setCurrentAgendaFile(null)
  }

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const addDummyData = () => {
    const dummyEntries: UploadEntry[] = [
      {
        id: '1',
        formData: {
          location: 'alexandria-va',
          meetingDate: '2024-03-15',
          meetingBody: 'city-council',
          meetingType: 'regular'
        },
        audioFile: new File(['audio content'], 'alexandria-council-2024-03-15.mp3', { type: 'audio/mpeg' }),
        agendaFile: new File(['agenda pdf'], 'alexandria-agenda-2024-03-15.pdf', { type: 'application/pdf' })
      },
      {
        id: '2',
        formData: {
          location: 'atlanta-ga',
          meetingDate: '2024-04-01',
          meetingBody: 'planning-commission',
          meetingType: 'special'
        },
        audioFile: new File(['audio content'], 'atlanta-planning-2024-04-01.mp3', { type: 'audio/mpeg' }),
        agendaFile: null
      },
      {
        id: '3',
        formData: {
          location: 'bellevue-wa',
          meetingDate: '2024-02-28',
          meetingBody: 'board-of-supervisors',
          meetingType: 'regular'
        },
        audioFile: new File(['audio content'], 'bellevue-supervisors-2024-02-28.m4a', { type: 'audio/mp4' }),
        agendaFile: new File(['agenda html'], 'bellevue-agenda-2024-02-28.html', { type: 'text/html' })
      }
    ]
    setEntries(dummyEntries)
  }

  const formatFileName = (file: File) => {
    const maxLength = 30
    if (file.name.length > maxLength) {
      return file.name.substring(0, maxLength - 3) + '...'
    }
    return file.name
  }

  const getLocationName = (value: string) => {
    const option = document.querySelector(`#location option[value="${value}"]`)
    return option?.textContent || value
  }

  return (
    <div className="hamlet-upload">
      <div className="upload-header">
        <h1 className="upload-title">Upload a meeting</h1>
        <button 
          type="button" 
          onClick={addDummyData} 
          className="dummy-data-btn"
        >
          Load Sample Data
        </button>
      </div>

      <form className="upload-form">
        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location *
          </label>
          <select
            id="location"
            name="location"
            value={currentForm.location}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select the location</option>
            <option value="albemarle-nc">Albemarle, NC</option>
            <option value="alexandria-va">Alexandria, VA</option>
            <option value="allen-tx">Allen, TX</option>
            <option value="arlington-wa">Arlington, WA</option>
            <option value="atlanta-ga">Atlanta, GA</option>
            <option value="aurora-co">Aurora, CO</option>
            <option value="azusa-ca">Azusa, CA</option>
            <option value="bellevue-wa">Bellevue, WA</option>
            <option value="bellingham-wa">Bellingham, WA</option>
            <option value="belmont-nc">Belmont, NC</option>
            <option value="brea-ca">Brea, CA</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="meetingDate" className="form-label">
            Meeting Date *
          </label>
          <input
            type="date"
            id="meetingDate"
            name="meetingDate"
            value={currentForm.meetingDate}
            onChange={handleInputChange}
            className="form-input"
            placeholder="mm/dd/yyyy"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="meetingBody" className="form-label">
            Meeting Body *
          </label>
          <select
            id="meetingBody"
            name="meetingBody"
            value={currentForm.meetingBody}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select the body</option>
            <option value="board-of-supervisors">Board of Supervisors</option>
            <option value="city-council">City Council</option>
            <option value="coastal-commission">Coastal Commission</option>
            <option value="planning-commission">Planning Commission</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="meetingType" className="form-label">
            Meeting Type *
          </label>
          <select
            id="meetingType"
            name="meetingType"
            value={currentForm.meetingType}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Select the type</option>
            <option value="regular">Regular Meeting</option>
            <option value="special">Special Meeting</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">
            Audio *
          </label>
          <div
            className={`file-dropzone ${audioDragActive ? 'dropzone-active' : ''}`}
            onDragEnter={(e) => handleDrag(e, 'audio')}
            onDragLeave={(e) => handleDrag(e, 'audio')}
            onDragOver={(e) => handleDrag(e, 'audio')}
            onDrop={(e) => handleDrop(e, 'audio')}
          >
            <input
              ref={audioInputRef}
              type="file"
              accept=".mp3,.m4a,audio/mpeg,audio/mp4"
              onChange={(e) => handleFileChange(e, 'audio')}
              style={{ display: 'none' }}
            />
            
            {currentAudioFile ? (
              <div className="file-info">
                <FileAudio size={20} className="file-icon-small" />
                <p className="file-name">{formatFileName(currentAudioFile)}</p>
                <button
                  type="button"
                  className="change-file-btn"
                  onClick={() => audioInputRef.current?.click()}
                >
                  Change file
                </button>
              </div>
            ) : (
              <div className="dropzone-empty" onClick={() => audioInputRef.current?.click()}>
                <Upload size={24} className="upload-icon-small" />
                <p className="dropzone-text">Drop your files here or click to choose your files.</p>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Agenda
          </label>
          <div
            className={`file-dropzone ${agendaDragActive ? 'dropzone-active' : ''}`}
            onDragEnter={(e) => handleDrag(e, 'agenda')}
            onDragLeave={(e) => handleDrag(e, 'agenda')}
            onDragOver={(e) => handleDrag(e, 'agenda')}
            onDrop={(e) => handleDrop(e, 'agenda')}
          >
            <input
              ref={agendaInputRef}
              type="file"
              accept=".pdf,.html,application/pdf,text/html"
              onChange={(e) => handleFileChange(e, 'agenda')}
              style={{ display: 'none' }}
            />
            
            {currentAgendaFile ? (
              <div className="file-info">
                <FileText size={20} className="file-icon-small" />
                <p className="file-name">{formatFileName(currentAgendaFile)}</p>
                <button
                  type="button"
                  className="change-file-btn"
                  onClick={() => agendaInputRef.current?.click()}
                >
                  Change file
                </button>
              </div>
            ) : (
              <div className="dropzone-empty" onClick={() => agendaInputRef.current?.click()}>
                <Upload size={24} className="upload-icon-small" />
                <p className="dropzone-text">Drop your files here or click to choose your files.</p>
              </div>
            )}
          </div>
        </div>

        <button type="button" onClick={addEntry} className="add-entry-btn">
          <Plus size={20} />
          Add to Upload Queue
        </button>
      </form>

      {entries.length > 0 && (
        <div className="entries-section">
          <div className="entries-header">
            <h2 className="entries-title">
              <FolderOpen size={24} />
              Upload Queue ({entries.length} {entries.length === 1 ? 'entry' : 'entries'})
            </h2>
            <button 
              type="button" 
              className="upload-all-btn"
              onClick={() => alert('Upload functionality would be implemented here')}
            >
              Upload All Files
            </button>
          </div>

          <div className="entries-list">
            {entries.map(entry => (
              <div key={entry.id} className="entry-item">
                <div className="entry-details">
                  <div className="entry-row">
                    <span className="entry-label">Location:</span>
                    <span className="entry-value">{getLocationName(entry.formData.location)}</span>
                  </div>
                  <div className="entry-row">
                    <span className="entry-label">Date:</span>
                    <span className="entry-value">{entry.formData.meetingDate}</span>
                  </div>
                  <div className="entry-row">
                    <span className="entry-label">Type:</span>
                    <span className="entry-value">{entry.formData.meetingType}</span>
                  </div>
                </div>
                
                <div className="entry-files">
                  <div className="entry-file">
                    <FileAudio size={16} className="file-icon-tiny" />
                    <span className="file-name-small">
                      {entry.audioFile ? formatFileName(entry.audioFile) : 'No audio file'}
                    </span>
                  </div>
                  {entry.agendaFile && (
                    <div className="entry-file">
                      <FileText size={16} className="file-icon-tiny" />
                      <span className="file-name-small">{formatFileName(entry.agendaFile)}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="remove-entry-btn"
                  onClick={() => removeEntry(entry.id)}
                  aria-label="Remove entry"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}